# Best Practices

## Naming Conventions

### Classes
- Use singular names for classes, e.g., `UserController`.
- Example:

```php
// Controllers
App\Http\Controllers\Admin\Users\UserController;
App\Http\Controllers\Api\Products\ProductController;
```

### Enums
- Place enums in `App\Enums\<Namespace>`.
- Example:

```php
App\Enums\Users\UserStatusEnum;
App\Enums\Orders\OrderStatusEnum;
```

- When an enum exists in the database, ensure it is added to the `$casts` in the model.
- Enum example:

```php
namespace App\Enums\Users;

enum UserStatusEnum: string
{
    case Active = 'active';
    case Inactive = 'inactive';
    case Pending = 'pending';

    /**
     * Returns the name of the enum.
     */
    public function name(): string
    {
        return match ($this) {
            self::Active   => trans("status.user.$this->value"),
            self::Inactive => trans("status.user.$this->value"),
            self::Pending  => trans("status.user.$this->value"),
        };
    }
}
```

### Requests, Resources, and Rules
- **Requests**: Prefixed with the action (e.g., `Store`, `Update`) and suffixed with `Request`.
  - Example:

```php
App\Http\Requests\Admin\Users\StoreUserRequest;
App\Http\Requests\Api\Products\UpdateProductRequest;
```

- **Resources**: Use singular names and specify the context (e.g., `Index`, `Show`).
  - Example:

```php
App\Http\Resources\Users\UserResource;
App\Http\Resources\Products\ProductIndexResource;
App\Http\Resources\Products\ProductShowResource;
```

- **Rules**: Use singular names with meaningful descriptions.
  - Example:

```php
App\Rules\ValidEmailRule;
App\Rules\PasswordStrengthRule;
```

### Plural vs. Singular
- Use singular names for file names and classes.
- Use plural names for folders when they contain multiple related classes.
- When working within specific namespaces (e.g., `Admin`, `Portal`), group classes related to an entity in a dedicated folder.
- Use `Jobs`, `Mailables`, and `Notifications` to encapsulate specific business processes or notifications, avoiding service or repository classes for internal logic.

Example:

```text
App/
├── Models/
│   ├── User.php
│   ├── Setting.php
├── Jobs/
│   ├── Users/
│   │   ├── NotifyJob.php
│   │   ├── ProcessImportJob.php
├── Mailables/
│   ├── Users/
│   │   ├── WelcomeMail.php
│   ├── Orders/
│       ├── ConfirmationMail.php
├── Notifications/
│   ├── Users/
│   │   ├── VerifiedNotification.php
│   │   ├── PasswordResetNotification.php
├── Controllers/
│   ├── Admin/
│   │   ├── Users/
│   │   │   ├── UserController.php
│   │   ├── Settings/
│   │       ├── SettingController.php
├── Services/
│   ├── External/
│   │   ├── BusinessCentralService.php
├── Repositories/
│   ├── External/
│       ├── BusinessCentralRepository.php
├── Rules/
│   ├── ValidEmailRule.php
│   ├── PasswordStrengthRule.php
├── Resources/
│   ├── Users/
│   │   ├── Resource.php
│   │   ├── IndexResource.php
│   ├── Settings/
│       ├── Resource.php
├── Requests/
│   ├── Admin/
│   │   ├── Users/
│   │   │   ├── StoreRequest.php
│   │   │   ├── UpdateRequest.php
│   ├── Api/
│       ├── Settings/
│           ├── UpdateRequest.php
```

---

## Eloquent Models
- Place models in the `App\Models` folder.
- Use singular names for models, e.g., `User`.

### Example Model
```php
namespace App\Models;

use App\Enums\Users\UserStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Model
{
    protected $fillable = ['name', 'email', 'password'];

    protected $casts = [
        'status' => UserStatusEnum::class,
    ];

    /**
     * Get all posts associated with the user.
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}
```


---

## API and Controllers

### RESTful Conventions
- API routes must adhere to RESTful conventions.
- Mixed-purpose controllers are not allowed.

### Routing and Controller Setup

**Routes:**

```php
// Portal Routes
Route::prefix('admin')->group(function () {
    Route::resource('users', App\Http\Controllers\Admin\Users\UserController::class);
});

// API Routes
Route::prefix('api')->group(function () {
    Route::apiResource('products', App\Http\Controllers\Api\Products\ProductController::class);
});
```

**Controller Structure:**

- Example:

```php
namespace App\Http\Controllers\Admin\Users;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\Users\UserResource;
use App\Http\Requests\Admin\Users\StoreUserRequest;
use App\Http\Requests\Admin\Users\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(): JsonResponse
    {
        return response()->json(UserResource::collection(User::all()));
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = User::create($request->validated());

        return response()->json(UserResource::make($user), 201);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $user->update($request->validated());

        return response()->json(UserResource::make($user));
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user): JsonResponse
    {
        $user->delete();

        return response()->noContent();
    }
}
```

---

## Authentication

- Use Sanctum for internal APIs.
- Use Passport for mobile apps and third-party APIs.

---

## Database Migrations

- Follow Laravel's default conventions.
- The `down` method in migrations can be ignored unless explicitly needed.

Example:
```php
namespace App\Migrations;

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
}
```

---

## Additional Notes

- **Frontend:**
  - The project uses Laravel Vite for asset bundling and InertiaJS for frontend rendering.
  - Blade files are generally avoided in favor of InertiaJS components.

- **Error Handling:**
  - Always return consistent error responses in JSON format for APIs.
  - Use custom exceptions where applicable for clearer debugging.

- **Localization:**
  - Ensure all user-facing strings are translatable using Laravel's localization features.

- **Performance:**
  - Use caching for expensive queries and computations.
  - Optimize database queries to avoid the N+1 problem by using eager loading.

- **Environment Variables:**
  - Keep sensitive configuration in `.env` files and ensure these are not committed to version control.
