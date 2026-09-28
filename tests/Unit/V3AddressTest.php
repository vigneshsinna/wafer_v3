<?php

namespace Tests\Unit;

use App\Http\Controllers\Api\V3\AddressController;
use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use PHPUnit\Framework\TestCase;

class V3AddressTest extends TestCase
{
    public function test_update_persists_validated_fields_and_respects_owner(): void
    {
        $db = new Capsule();
        $db->addConnection(['driver' => 'sqlite', 'database' => ':memory:']);
        $db->setAsGlobal();
        $db->bootEloquent();
        $db->schema()->create('addresses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->string('address');
            $table->integer('country_id');
            $table->integer('state_id');
            $table->integer('city_id');
            $table->string('postal_code');
            $table->string('phone');
            $table->timestamps();
        });
        $id = $db->table('addresses')->insertGetId([
            'user_id' => 1, 'address' => 'Old', 'country_id' => 1, 'state_id' => 1,
            'city_id' => 1, 'postal_code' => '111111', 'phone' => '1234567890',
        ]);
        $data = [
            'address' => 'New', 'country_id' => 2, 'state_id' => 3,
            'city_id' => 4, 'postal_code' => '638001', 'phone' => '9876543210',
        ];
        $request = new class extends Request {
            public function validate(array $rules): array { return $this->all(); }
        };
        $request->replace($data);
        $request->setUserResolver(fn () => (object) ['id' => 1]);
        $controller = new class extends AddressController {
            protected function resourceResponse($model, string $resourceClass, int $status = 200): JsonResponse
            {
                return new JsonResponse(['id' => $model->id]);
            }
        };

        $controller->update($request, $id);
        self::assertSame('New', $db->table('addresses')->where('id', $id)->value('address'));
        self::assertSame(4, $db->table('addresses')->where('id', $id)->value('city_id'));

        $request->replace(['address' => 'Partial update']);
        $controller->update($request, $id);
        self::assertSame('Partial update', $db->table('addresses')->where('id', $id)->value('address'));
        self::assertSame(4, $db->table('addresses')->where('id', $id)->value('city_id'));

        $request->setUserResolver(fn () => (object) ['id' => 2]);
        $this->expectException(\Illuminate\Database\Eloquent\ModelNotFoundException::class);
        $controller->update($request, $id);
    }
}
