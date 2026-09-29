<?php

namespace Tests\Unit;

use App\Http\Resources\V3\ProductResource;
use App\Http\Middleware\HeadlessCors;
use App\Models\Cart;
use App\Models\Product;
use App\Models\ProductTax;
use App\Models\Order;
use App\Services\Cart\CartService;
use App\Services\Order\OrderQueryService;
use App\Services\Support\ContactService;
use App\Services\Review\ReviewService;
use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Container\Container;
use Illuminate\Config\Repository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Facade;
use PHPUnit\Framework\TestCase;

class V3StorefrontSafetyTest extends TestCase
{
    public function test_public_product_does_not_expose_purchase_price(): void
    {
        $product = new class extends Product {
            public function getTranslation($field = '', $lang = false)
            {
                return $this->$field;
            }
        };
        $product->forceFill(['name' => 'Wafer', 'description' => 'Snack', 'purchase_price' => 42]);
        $product->setRelation('main_category', null);
        $product->setRelation('brand', null);
        $product->setRelation('reviews', new Collection());
        $product->setRelation('stocks', new Collection());
        $product->setRelation('taxes', new Collection());
        $product->setRelation('thumbnail', null);

        $data = (new ProductResource($product))->toArray(null);

        self::assertArrayNotHasKey('purchase_price', $data);
    }

    public function test_product_resource_uses_catalogue_aggregates(): void
    {
        $product = new class extends Product {
            public function getTranslation($field = '', $lang = false)
            {
                return $this->$field;
            }
        };
        $product->forceFill([
            'approved_reviews_count' => 3,
            'stock_quantity' => 5,
        ]);
        $product->setRelation('main_category', null);
        $product->setRelation('brand', null);
        $product->setRelation('taxes', new Collection());

        $data = (new ProductResource($product))->toArray(null);

        self::assertSame(3, $data['rating_count']);
        self::assertSame('in_stock', $data['stock_status']);
        self::assertFalse($product->relationLoaded('reviews'));
        self::assertFalse($product->relationLoaded('stocks'));

        $product->forceFill(['stock_quantity' => null]);
        self::assertSame('out_of_stock', (new ProductResource($product))->toArray(null)['stock_status']);
        self::assertFalse($product->relationLoaded('stocks'));
    }

    public function test_product_collection_batches_extra_gallery_uploads(): void
    {
        $db = new Capsule();
        $db->addConnection(['driver' => 'sqlite', 'database' => ':memory:']);
        $db->setAsGlobal();
        $db->bootEloquent();
        $db->schema()->create('uploads', function (Blueprint $table) {
            $table->increments('id');
            $table->string('file_name');
            $table->timestamp('deleted_at')->nullable();
        });
        $db->table('uploads')->insert([
            ['id' => 2, 'file_name' => 'uploads/all/extra-2.png'],
            ['id' => 3, 'file_name' => 'uploads/all/extra-3.png'],
        ]);
        $products = [
            (new Product())->forceFill(['thumbnail_img' => 1, 'photos' => '1,2']),
            (new Product())->forceFill(['thumbnail_img' => 1, 'photos' => '1,3']),
        ];

        $db->connection()->enableQueryLog();
        ProductResource::collection($products);

        self::assertCount(1, $db->connection()->getQueryLog());
        self::assertCount(2, $products[0]->getRelation('gallery_uploads'));
        self::assertSame($products[0]->getRelation('gallery_uploads'), $products[1]->getRelation('gallery_uploads'));
    }

    public function test_catalogue_prices_apply_discount_and_product_tax(): void
    {
        $product = new Product();
        $product->forceFill(['unit_price' => 100, 'discount' => 10, 'discount_type' => 'percent']);
        $product->setRelation('taxes', new Collection([
            (new ProductTax())->forceFill(['tax_type' => 'percent', 'tax' => 5]),
        ]));

        self::assertSame(['sale' => 94.5, 'compare_at' => 105.0],
            (new \App\Services\Catalog\ProductCatalogService())->displayPrices($product));
    }

    public function test_clear_cart_affects_only_current_users_active_rows(): void
    {
        $db = new Capsule();
        $db->addConnection(['driver' => 'sqlite', 'database' => ':memory:']);
        $db->setAsGlobal();
        $db->bootEloquent();
        $db->schema()->create('carts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('status');
        });
        $db->table('carts')->insert([
            ['user_id' => 1, 'status' => 1],
            ['user_id' => 1, 'status' => 0],
            ['user_id' => 2, 'status' => 1],
        ]);

        (new CartService())->clear(1);

        self::assertSame(0, Cart::where('user_id', 1)->active()->count());
        self::assertSame(1, Cart::where('user_id', 1)->count());
        self::assertSame(1, Cart::where('user_id', 2)->active()->count());
    }

    public function test_removed_cart_rows_cannot_be_mutated_as_active_items(): void
    {
        $db = new Capsule();
        $db->addConnection(['driver' => 'sqlite', 'database' => ':memory:']);
        $db->setAsGlobal();
        $db->bootEloquent();
        $db->schema()->create('carts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('status');
        });
        $id = $db->table('carts')->insertGetId(['user_id' => 1, 'status' => 0]);

        $this->expectException(\Illuminate\Database\Eloquent\ModelNotFoundException::class);
        (new CartService())->removeItem($id, 1);
    }

    public function test_public_tracking_returns_status_without_customer_data(): void
    {
        $db = new Capsule();
        $db->addConnection(['driver' => 'sqlite', 'database' => ':memory:']);
        $db->setAsGlobal();
        $db->bootEloquent();
        $db->schema()->create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code');
            $table->string('payment_status');
            $table->string('delivery_status');
            $table->string('shipping_address');
            $table->timestamps();
        });
        $db->table('orders')->insert([
            ['code' => 'PAID-1', 'payment_status' => 'paid', 'delivery_status' => 'shipped', 'shipping_address' => '{"phone":"private"}', 'created_at' => now(), 'updated_at' => now()],
            ['code' => 'UNPAID-1', 'payment_status' => 'unpaid', 'delivery_status' => 'pending', 'shipping_address' => '{"phone":"private"}', 'created_at' => now(), 'updated_at' => now()],
        ]);

        $tracking = (new OrderQueryService())->getPublicTracking('PAID-1');

        self::assertSame(['code', 'delivery_status', 'created_at'], array_keys($tracking));
        self::assertSame('shipped', $tracking['delivery_status']);
        $this->expectException(\Illuminate\Database\Eloquent\ModelNotFoundException::class);
        (new OrderQueryService())->getPublicTracking('UNPAID-1');
    }

    public function test_contact_message_uses_existing_admin_inbox(): void
    {
        $db = new Capsule();
        $db->addConnection(['driver' => 'sqlite', 'database' => ':memory:']);
        $db->setAsGlobal();
        $db->bootEloquent();
        $db->schema()->create('contacts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->text('content');
        });

        (new ContactService())->submit([
            'name' => 'Customer',
            'email' => 'customer@example.com',
            'subject' => 'Delivery',
            'message' => 'Where is my order?',
        ]);

        self::assertSame('Delivery' . "\n\n" . 'Where is my order?', $db->table('contacts')->value('content'));
    }

    public function test_customer_cannot_edit_another_customers_review(): void
    {
        $db = new Capsule();
        $db->addConnection(['driver' => 'sqlite', 'database' => ':memory:']);
        $db->setAsGlobal();
        $db->bootEloquent();
        $db->schema()->create('reviews', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('product_id');
            $table->integer('rating');
            $table->text('comment');
            $table->integer('status');
        });
        $id = $db->table('reviews')->insertGetId([
            'user_id' => 1, 'product_id' => 1, 'rating' => 5, 'comment' => 'Original review', 'status' => 1,
        ]);

        $app = new Container();
        $app->instance('db', $db->getDatabaseManager());
        Facade::setFacadeApplication($app);
        try {
            $this->expectException(\Illuminate\Database\Eloquent\ModelNotFoundException::class);
            (new ReviewService())->update($id, 2, ['rating' => 1, 'comment' => 'Changed by another user']);
        } finally {
            Facade::clearResolvedInstance('db');
            Facade::setFacadeApplication(null);
        }
    }

    public function test_cors_does_not_allow_credentials_with_wildcard_origin(): void
    {
        $previous = Container::getInstance();
        $app = new Container();
        $app->instance('config', new Repository(['headless' => ['cors' => ['origins' => ['*'], 'max_age' => 60]]]));
        Container::setInstance($app);
        try {
            $request = Request::create('/api/v3/health', 'GET', [], [], [], ['HTTP_ORIGIN' => 'https://example.com']);
            $response = (new HeadlessCors())->handle($request, fn () => new Response('ok'));
            self::assertSame('*', $response->headers->get('Access-Control-Allow-Origin'));
            self::assertNull($response->headers->get('Access-Control-Allow-Credentials'));
        } finally {
            Container::setInstance($previous);
        }
    }

    public function test_v3_preflight_is_handled_before_routing_without_changing_v2(): void
    {
        $previous = Container::getInstance();
        $app = new Container();
        $app->instance('config', new Repository(['headless' => ['cors' => ['origins' => ['http://127.0.0.1:3000'], 'max_age' => 60]]]));
        Container::setInstance($app);
        try {
            $request = Request::create('/api/v3/auth/login', 'OPTIONS', [], [], [], ['HTTP_ORIGIN' => 'http://127.0.0.1:3000']);
            $response = (new HeadlessCors())->handle($request, function () { self::fail('Preflight must not reach the router.'); });
            self::assertSame(204, $response->getStatusCode());
            self::assertSame('http://127.0.0.1:3000', $response->headers->get('Access-Control-Allow-Origin'));
            self::assertStringContainsString('POST', $response->headers->get('Access-Control-Allow-Methods'));

            $v2 = Request::create('/api/v2/auth/login', 'OPTIONS', [], [], [], ['HTTP_ORIGIN' => 'http://127.0.0.1:3000']);
            $v2Response = (new HeadlessCors())->handle($v2, fn () => new Response('existing'));
            self::assertSame('existing', $v2Response->getContent());
            self::assertNull($v2Response->headers->get('Access-Control-Allow-Origin'));
        } finally {
            Container::setInstance($previous);
        }
    }
}
