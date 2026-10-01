<?php

namespace App\Http\Controllers\Api\V3;

use App\Http\Resources\V3\AddressResource;
use App\Models\Address;
use App\Models\City;
use App\Models\Country;
use App\Models\Pincode;
use App\Models\State;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AddressController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $addresses = Address::where('user_id', $request->user()->id)->latest()->get();

        return $this->collectionResponse($addresses, AddressResource::class);
    }

    public function countries(): JsonResponse
    {
        return $this->successResponse(Country::isEnabled()->orderBy('name')->get(['id', 'name']));
    }

    public function states(int $countryId): JsonResponse
    {
        $country = Country::isEnabled()->findOrFail($countryId);
        $states = State::where('country_id', $countryId)
            ->where('status', 1)->orderBy('name')->get(['id', 'name']);
        if (strtoupper((string) $country->code) === 'IN') {
            $validStates = Pincode::activeIndianStates();
            $states = $states->filter(fn ($state) => isset($validStates[Pincode::canonicalIndianState($state->name)]))->values();
        }

        return $this->successResponse($states);
    }

    public function cities(int $stateId): JsonResponse
    {
        State::where('status', 1)->findOrFail($stateId);

        return $this->successResponse(City::where('state_id', $stateId)
            ->where('status', 1)->orderBy('name')->get(['id', 'name']));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate($this->rules($request));

        $address = new Address();
        $address->user_id     = $request->user()->id;
        foreach ($data as $field => $value) {
            $address->{$field} = $value;
        }
        $address->save();

        return $this->createdResponse(new AddressResource($address), 'Address created.');
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $address = Address::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $fields = ['recipient_name', 'address', 'country_id', 'state_id', 'city_id', 'postal_code', 'phone'];
        $request->replace(array_merge($address->only($fields), $request->only($fields)));
        $data = $request->validate($this->rules($request));
        foreach ($data as $field => $value) {
            $address->{$field} = $value;
        }
        $address->save();

        return $this->resourceResponse($address->fresh(), AddressResource::class);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $address = Address::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $address->delete();

        return $this->successResponse(null, ['message' => 'Address deleted.']);
    }

    private function rules(Request $request): array
    {
        $country = Country::find($request->input('country_id'));
        $state = State::find($request->input('state_id'));

        return [
            'recipient_name' => 'nullable|string|max:255',
            'address' => 'required|string|max:1000',
            'country_id' => ['required', 'integer', Rule::exists('countries', 'id')->where('status', 1)],
            'state_id' => ['required', 'integer', Rule::exists('states', 'id')
                ->where('country_id', $request->input('country_id'))->where('status', 1)],
            'city_id' => ['required', 'integer', Rule::exists('cities', 'id')
                ->where('state_id', $request->input('state_id'))->where('status', 1)],
            'postal_code' => [
                'required', 'string', 'max:20',
                function (string $attribute, mixed $value, \Closure $fail) use ($country, $state): void {
                    if ($country?->code === 'IN' && !Pincode::matchesIndianAddress(trim((string) $value), (string) $state?->name)) {
                        $fail('Enter an active Indian PIN code that matches the selected state.');
                    }
                },
            ],
            'phone' => 'required|string|max:30',
        ];
    }
}
