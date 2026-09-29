<?php

namespace Tests\Unit;

use App\Models\Blog;
use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;
use PHPUnit\Framework\TestCase;

class V3BlogVisibilityTest extends TestCase
{
    public function test_public_blog_query_excludes_drafts_and_soft_deleted_articles(): void
    {
        $db = new Capsule();
        $db->addConnection(['driver' => 'sqlite', 'database' => ':memory:']);
        $db->setAsGlobal();
        $db->bootEloquent();
        $db->schema()->create('blogs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('slug');
            $table->integer('status');
            $table->softDeletes();
        });
        $db->table('blogs')->insert([
            ['slug' => 'published', 'status' => 1, 'deleted_at' => null],
            ['slug' => 'draft', 'status' => 0, 'deleted_at' => null],
            ['slug' => 'deleted', 'status' => 1, 'deleted_at' => now()],
        ]);

        self::assertSame(['published'], Blog::published()->pluck('slug')->all());
    }
}
