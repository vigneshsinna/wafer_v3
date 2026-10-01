<#
  Single-command deploy for Wafer King.

  Usage (from project root):
      .\deploy.ps1                "optional commit message"
      .\deploy.ps1 -Direct        # also SSH in and run deploy.sh immediately

  Default flow:
    1. Stages + commits local changes (if any).
    2. Pushes to origin/main.
    3. GitHub Actions uses SSH secrets to run deploy.sh on the configured server:
       git pull, composer install, migrations, branding sync and cache rebuild.

  -Direct also opens an SSH session to the server and runs deploy.sh right away
  (useful if GitHub Actions is disabled). Requires an SSH key or you type the
  password once. Set SSH_HOST, SSH_USER and optionally SSH_PORT, SSH_KEY_PATH,
  and DEPLOY_SERVER_DIR for the Wafer King server before using -Direct.
#>
param(
    [Parameter(ValueFromRemainingArguments = $true)][string[]]$Message,
    [switch]$Direct
)

$ErrorActionPreference = "Stop"

# --- Deployment target ----------------------------------------------------
$SshHost = "$($env:SSH_USER)@$($env:SSH_HOST)"
$SshPort = if ($env:SSH_PORT) { $env:SSH_PORT } else { "22" }
$SshKey  = if ($env:SSH_KEY_PATH) { $env:SSH_KEY_PATH } else { "$env:USERPROFILE\.ssh\animazon_deploy" }
$ServerDir = if ($env:DEPLOY_SERVER_DIR) { $env:DEPLOY_SERVER_DIR } else { "~/public_html" }
if ($Direct -and (!$env:SSH_HOST -or !$env:SSH_USER)) {
    throw "Set SSH_HOST and SSH_USER to the Wafer King server before direct deployment."
}
# --------------------------------------------------------------------------

$msg = if ($Message) { $Message -join " " } else { "deploy: " + (Get-Date -Format "yyyy-MM-dd HH:mm") }

Write-Host "==> Staging changes..." -ForegroundColor Cyan
git add -A

git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
    Write-Host "==> Committing: $msg" -ForegroundColor Cyan
    git commit -m $msg
} else {
    Write-Host "No staged changes; pushing current HEAD." -ForegroundColor Yellow
}

Write-Host "==> Pushing to origin/main..." -ForegroundColor Cyan
git push origin main

if ($Direct) {
    Write-Host "==> Running deploy.sh on server over SSH..." -ForegroundColor Cyan
    ssh -i $SshKey -p $SshPort $SshHost "cd $ServerDir && bash deploy.sh"
    Write-Host "Done (direct)." -ForegroundColor Green
} else {
    Write-Host "Pushed. GitHub Actions will trigger direct SSH deployment." -ForegroundColor Green
    Write-Host "   Auto: pull + composer + DB migrate + cache rebuild on the server." -ForegroundColor Green
    Write-Host "   Watch:   the repository's GitHub Actions page" -ForegroundColor DarkGray
    Write-Host "   Log:     ssh -i $SshKey -p $SshPort $SshHost 'tail -n 50 $ServerDir/storage/logs/deploy.log'" -ForegroundColor DarkGray
}
