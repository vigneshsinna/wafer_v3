<?php

namespace App\Http\Controllers\Api\V3;

use App\Http\Resources\V3\ReviewResource;
use App\Services\Review\ReviewService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(string $slug, Request $request, ReviewService $reviews): JsonResponse
    {
        $page = $reviews->listPublic($slug, $this->getPerPage($request->integer('per_page', 10)));

        return $this->paginatedResponse($page, ReviewResource::class);
    }

    public function summary(string $slug, ReviewService $reviews): JsonResponse
    {
        return $this->successResponse($reviews->summary($slug));
    }

    public function mine(Request $request, ReviewService $reviews): JsonResponse
    {
        return $this->collectionResponse($reviews->listMine($request->user()->id), ReviewResource::class);
    }

    public function store(string $slug, Request $request, ReviewService $reviews): JsonResponse
    {
        $data = $request->validate(['rating' => 'required|integer|between:1,5', 'comment' => 'required|string|min:10|max:5000']);
        try {
            return $this->createdResponse(new ReviewResource($reviews->create($slug, $request->user()->id, $data)), 'Review submitted for approval.');
        } catch (\InvalidArgumentException $e) {
            return $this->errorResponse($e->getMessage(), 422, 'VALIDATION_FAILED');
        }
    }

    public function update(int $id, Request $request, ReviewService $reviews): JsonResponse
    {
        $data = $request->validate(['rating' => 'required|integer|between:1,5', 'comment' => 'required|string|min:10|max:5000']);

        return $this->resourceResponse($reviews->update($id, $request->user()->id, $data), ReviewResource::class);
    }

    public function destroy(int $id, Request $request, ReviewService $reviews): JsonResponse
    {
        $reviews->delete($id, $request->user()->id);

        return $this->successResponse(null, ['message' => 'Review deleted.']);
    }
}
