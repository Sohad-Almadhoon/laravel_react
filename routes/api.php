import Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::middleware("auth:sanctum")->get("/user", function (Request $request) {
    return $request->user();
});
Route::post("/login", [ApiController::class, "login"]);
Route::post("/signup", [ApiController::class, "signup"]);