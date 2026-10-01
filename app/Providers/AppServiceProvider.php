<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Pagination\Paginator;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Bootstrap any application services.
   *
   * @return void
   */
  public function boot()
  {
      Schema::defaultStringLength(191);
      Paginator::useBootstrap();
  }

  /**
   * Register any application services.
   *
   * @return void
   */
  public function register()
  {
      if (class_exists(\Illuminate\Foundation\Console\ServeCommand::class)) {
          \Illuminate\Foundation\Console\ServeCommand::$passthroughVariables = array_unique(array_merge(
              \Illuminate\Foundation\Console\ServeCommand::$passthroughVariables,
              [
                  'TEMP',
                  'TMP',
                  'SystemDrive',
                  'SystemRoot',
                  'SYSTEMROOT',
                  'windir',
                  'WINDIR',
                  'USERPROFILE',
                  'HOMEDRIVE',
                  'HOMEPATH',
                  'APPDATA',
                  'LOCALAPPDATA',
                  'ComSpec',
                  'COMSPEC',
              ]
          ));
      }
  }
}
