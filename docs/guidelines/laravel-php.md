---
title: Laravel & PHP
---

## About Laravel

First and foremost, Laravel provides the most value when you write things the way Laravel intended you to write. If there's a documented way to achieve something, follow it. Whenever you do something differently, make sure you have a justification for *why* you didn't follow the defaults.

## General PHP Rules

### Code Style Standards

All code must adhere to the following standards:
- [PSR-1](http://www.php-fig.org/psr/psr-1/)
- [PSR-2](http://www.php-fig.org/psr/psr-2/)
- [PSR-12](https://www.php-fig.org/psr/psr-12/)

Consistent styling ensures readability and maintainability across the codebase.

### Variable Naming

- Use **camelCase** for variables and method names.
- Use **PascalCase** for class names.
- Use **UPPER_SNAKE_CASE** for constants.

:::tip[good]
```php
$activeUsersCount = 42;
class UserManagement {}
define('MAX_LOGIN_ATTEMPTS', 3);
```
:::

:::warning[bad]
```php
$active_users_count = 42;
class user_management {}
const maxLoginAttempts = 3;
```
:::

### Class Defaults

Avoid using the `final` keyword unless absolutely necessary. Flexibility in extending functionality is preferred.

:::tip[good]
```php
class UserService
{
    public function activateUser(User $user): void
    {
        $user->activate();
    }
}
```
:::

:::warning[bad]
```php
final class UserService
{
    public function activateUser(User $user): void
    {
        $user->activate();
    }
}
```
:::

### Nullable and Union Types

When using nullable types, prefer the short nullable syntax.

:::tip[good]
```php
public ?int $userId;
```
:::

:::warning[bad]
```php
public int | null $userId;
```
:::

### Void Return Types

Indicate explicitly when a method does not return a value by using the `void` return type.

:::tip[good]
```php
public function sendNotification(): void
{
    Notification::send($this->user, new WelcomeMessage());
}
```
:::

:::warning[bad]
```php
public function sendNotification()
{
    Notification::send($this->user, new WelcomeMessage());
}
```
:::

### Typed Properties

Always type properties whenever possible. Avoid using docblocks to specify types unless absolutely necessary.

:::tip[good]
```php
class Order
{
    public string $status;
    public DateTime $createdAt;
}
```
:::

:::warning[bad]
```php
class Order
{
    /** @var string */
    public $status;
    /** @var DateTime */
    public $createdAt;
}
```
:::

### Enums

Values in enums should follow **PascalCase** naming conventions.

:::tip[good]
```php
enum PaymentStatus {
    case Pending;
    case Completed;
    case Failed;
}
```
:::

:::warning[bad]
```php
enum PaymentStatus {
    case pending;
    case COMPLETED;
    case failed;
}
```
:::

### Docblocks

Avoid redundant docblocks. Use them only when they provide additional context or clarity beyond type hints.

:::tip[good]
```php
class Product
{
    /**
     * Calculate the product's total price, including tax.
     */
    public function calculateTotalPrice(): float
    {
        return $this->price * 1.21;
    }
}
```
:::

:::warning[bad]
```php
class Product
{
    /**
     * @return float The product's total price, including tax.
     */
    public function calculateTotalPrice(): float
    {
        return $this->price * 1.21;
    }
}
```
:::

### Iterable Docblocks

When working with arrays or collections, include key and value types in the docblocks to improve clarity and IDE support.

:::tip[good]
```php
/**
 * @param array<int, User> $users
 */
function notifyUsers(array $users): void
{
    foreach ($users as $user) {
        $user->notify(new AccountAlert());
    }
}
```
:::

:::warning[bad]
```php
/**
 * @param array $users
 */
function notifyUsers(array $users): void
{
    foreach ($users as $user) {
        $user->notify(new AccountAlert());
    }
}
```
:::

By adhering to these general rules, the codebase remains clean, consistent, and easy to maintain.

## Constructor property promotion

Use constructor property promotion if all properties can be promoted. To make it readable, put each one on a line of its own. Use a comma after the last one.

:::tip[good]
```php
class MyClass {
    public function __construct(
        protected string $firstArgument,
        protected string $secondArgument,
    ) {}
}
```
:::

:::warning[bad]
```php
class MyClass {
    protected string $secondArgument

    public function __construct(protected string $firstArgument, string $secondArgument)
    {
        $this->secondArgument = $secondArgument;
    }
}
```
:::

## Traits

Each applied trait should go on its own line, and the `use` keyword should be used for each of them. This will result in clean diffs when traits are added or removed.

:::tip[good]
```php
class MyClass
{
    use TraitA;
    use TraitB;
}
```
:::

:::warning[bad]
```php
class MyClass
{
    use TraitA, TraitB;
}
```
:::

## Strings

When possible prefer string interpolation above `sprintf` and the `.` operator.

:::tip[good]
```php
$greeting = "Hi, I am {$name}.";
```
:::

:::warning[bad]
```php
$greeting = 'Hi, I am ' . $name . '.';
```
:::


## Ternary operators

Every portion of a ternary expression should be on its own line unless it's a really short expression.

:::tip[good]
```php
$name = $isFoo ? 'foo' : 'bar';
```
:::

:::tip[good]
```php
$result = $object instanceof Model ?
    $object->name :
   'A default value';
```
:::

## If statements

### Bracket position

Always use curly brackets.

:::tip[good]
```php
if ($condition) {
   ...
}
```
:::

:::warning[bad]
```php
if ($condition) ...
```
:::

### Happy path

Generally a function should have its unhappy path first and its happy path last. In most cases this will cause the happy path being in an unindented part of the function which makes it more readable.

:::tip[good]
```php
if (!$goodCondition) {
  throw new Exception;
}
```
:::


:::warning[bad]
```php
if ($goodCondition) {
 // do work
}

throw new Exception;
```
:::

### Avoid else

In general, `else` should be avoided because it makes code less readable. In most cases it can be refactored using early returns. This will also cause the happy path to go last, which is desirable.

:::tip[good]
```php
if (!$conditionA) {
   // condition A failed

   return;
}

if (!$conditionB) {
   // condition A passed, B failed

   return;
}

// condition A and B passed
```
:::

:::warning[bad]
```php
if ($conditionA) {
   if ($conditionB) {
      // condition A and B passed
   }
   else {
     // condition A passed, B failed
   }
}
else {
   // condition A failed
}
```
:::

Another option to refactor an `else` away is using a ternary

:::warning[bad]
```php
if ($condition) {
    $this->doSomething();
} 
else {
    $this->doSomethingElse();
}
```
:::

:::tip[good]
```php
$condition
    ? $this->doSomething()
    : $this->doSomethingElse();
```
:::

### Compound ifs

In general, separate `if` statements should be preferred over a compound condition. This makes debugging code easier.


:::tip[good]
```php
if (!$conditionA) {
   return;
}

if (!$conditionB) {
   return;
}

if (!$conditionC) {
   return;
}

// do stuff
```
:::

:::warning[bad]
```php
if ($conditionA && $conditionB && $conditionC) {
  // do stuff
}
```
:::

## Strict comparisons

Always use strict comparisons (`!==`, `===`) instead of loose comparisons (`!=`, `==`). Strict comparisons ensure type safety and reduce unexpected behavior.

:::tip[good]
```php
// Good
if ($value !== null) {
    // Do something
}
```
:::

:::warning[bad]
```php
// Bad
if ($value != null) {
    // Do something
}
```
:::

## Naming Conventions for variables 

### PHP Variables

- Use `camelCase` for variable names within PHP classes.
- For constants, use `UPPER_SNAKE_CASE`.
- Enums should use `PascalCase` for their values.

### Passing data from controllers to views

- Use `snake_case` for keys in the data array when passing data to views and accessing them in Blade templates. This aligns with traditional Laravel conventions and improves readability in Blade.
- Maintain consistency in variable naming across the application.

### Example

**Controller:**
```php
class ExampleController extends Controller
{
    public function show()
    {
        $userName = 'John Doe';
        $userAge = 25;

        return view('example', [
            'user_name' => $userName, // snake_case for view keys
            'user_age' => $userAge,  // snake_case for view keys
        ]);
    }
}
```

**Blade View:**
```html
<h1>Welcome, {{ $user_name }}</h1>
<p>Age: {{ $user_age }}</p>
```

#### Why?

Using `snake_case` for view keys aligns with traditional Laravel conventions and ensures consistency across the codebase. It also makes the data structure more predictable when working with Blade templates, reducing ambiguity and improving maintainability.

## Comments

Comments should be avoided as much as possible by writing expressive code. If you do need to use a comment, format it like this:

```php
// There should be a space before a single line comment.

/*
 * If you need to explain a lot you can use a comment block. Notice the
 * single * on the first line. Comment blocks don't need to be three
 * lines long or three characters shorter than the previous line.
 */
```

A possible strategy to refactor away a comment is to create a function with name that describes the comment

:::tip[good]
```php
$this->calculateLoans();
```
:::

:::warning[bad]
```php
// Start calculating loans
$this->calculateLoans();
```
:::
## Whitespace

Statements should be allowed to breathe. In general always add blank lines between statements, unless they're a sequence of single-line equivalent operations. This isn't something enforceable, it's a matter of what looks best in its context.

:::tip[good]
```php
public function getPage($url)
{
    $page = $this->pages()->where('slug', $url)->first();

    if (!$page) {
        return null;
    }

    if ($page['private'] && !Auth::check()) {
        return null;
    }

    return $page;
}
```
:::

:::warning[bad]
```php
// Everything's cramped together.
public function getPage($url)
{
    $page = $this->pages()->where('slug', $url)->first();
    if (!$page) {
        return null;
    }
    if ($page['private'] && !Auth::check()) {
        return null;
    }
    return $page;
}
```
:::

:::tip[good]
```php
// A sequence of single-line equivalent operations.
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->increments('id');
        $table->string('name');
        $table->string('email')->unique();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
    });
}
```
:::

Don't add any extra empty lines between `{}` brackets.

:::tip[good]
```php
if ($foo) {
    $this->foo = $foo;
}
```
:::

:::warning[bad]
```php
if ($foo) {

    $this->foo = $foo;
}
```
:::

## Configuration

Configuration files must use kebab-case.

```
config/
  pdf-generator.php
```

Configuration keys must use snake_case.

```php
// config/pdf-generator.php
return [
    'chrome_path' => env('CHROME_PATH'),
];
```

Avoid using the `env` helper outside of configuration files. Create a configuration value from the `env` variable like above.

When adding config values for a specific service, add them to the `services` config file. Do not create a new config file.

:::tip[good]
```php
// Adding credentials to `config/services.php`
return [
    'ses' => [
        'key'       => env('SES_AWS_ACCESS_KEY_ID'),
        'secret'    => env('SES_AWS_SECRET_ACCESS_KEY'),
        'region'    => env('SES_AWS_DEFAULT_REGION', 'us-east-1'),
    ],
    
    'github' => [
        'username'          => env('GITHUB_USERNAME'),
        'token'             => env('GITHUB_TOKEN'),
        'client_id'         => env('GITHUB_CLIENT_ID'),
        'client_secret'     => env('GITHUB_CLIENT_SECRET'),
        'redirect'          => env('GITHUB_CALLBACK_URL'),
        'docs_access_token' => env('GITHUB_ACCESS_TOKEN'),
    ],
    
    'weyland_yutani' => [
        'token' => env('WEYLAND_YUTANI_TOKEN')
    ],   
];
```
:::

:::warning[bad]
```php
// Creating a new config file: `weyland-yutani.php`

return [
    'weyland_yutani' => [
        'token' => env('WEYLAND_YUTANI_TOKEN')
    ],  
]
```
:::

## Artisan Commands

### Naming
- The names of Artisan commands must be in **kebab-case**. This ensures consistency and readability in the CLI.

:::tip[good]
```bash
php artisan users:create-local
```
:::

:::warning[bad]
```bash
php artisan usersCreateLocal
```
:::

### Structure

An Artisan command must always have a clear description and signature:

#### Example
```php
protected $signature = 'users:create-local';

protected $description = 'Create a user for your local environment';
```

### User Feedback

1. **Provide clear feedback** during and after the execution of a command:
   - Inform the user about progress.
   - Report results or errors.
2. **Use helpers like `info`, `warning`, and `form` for user interaction**.

#### Example
```php
public function handle(): void
{
    if (!app()->isLocal()) {
        $this->warn('This command can only be run in local environment.');
        return;
    }

    $user = form()
        ->text('Email', required: true, validate: 'email', name: 'email')
        ->text('First name', required: true, name: 'first_name')
        ->text('Last name', required: true, name: 'last_name')
        ->submit();

    User::create($user);

    $this->info("User {$user['first_name']} created successfully!");
}
```



### Iterative Processing

When processing multiple items:
- Provide progressive feedback within a loop to inform users about the progress.
- Display a summary upon completion.

#### Example
```php
public function handle(): void
{
    $this->info('Starting to process users...');

    User::all()->each(function ($user) {
        $this->info("Processing user {$user->id}...");
        // Process the user
    });

    $this->comment('All users processed successfully.');
}
```

## Attributes in Laravel Models

Starting from Laravel 9.19, you can use the `Attribute::make` class to define accessors and mutators within your models. This is the **preferred** approach over older methods like `getNameAttribute` and `setNameAttribute`. The new method provides better structure, flexibility, and avoids naming conflicts.

### Best Practice

Here is an example of how to properly implement attributes using the `Attribute::make` class:

```php
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Model
{
    /**
     * Get and set the user's full name.
     */
    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn () => "{$this->first_name} {$this->last_name}",
            set: fn (string $value) => [
                'first_name' => explode(' ', $value)[0],
                'last_name' => explode(' ', $value)[1] ?? '',
            ],
        );
    }
}
```

#### Why This Approach?
- **Readable**: Clearly separates the `get` and `set` logic.
- **Avoids conflicts**: Prevents naming conflicts with other methods in the model.
- **Flexible**: Supports complex logic for both reading and writing data.

### Avoid Legacy Methods

Using methods like `getNameAttribute` and `setNameAttribute` is considered outdated. Here is an example of what you should **not** do:

```php
class User extends Model
{
    /**
     * Get the user's full name (outdated method).
     */
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    /**
     * Set the user's full name (outdated method).
     */
    public function setFullNameAttribute(string $value): void
    {
        $names = explode(' ', $value);
        $this->attributes['first_name'] = $names[0];
        $this->attributes['last_name'] = $names[1] ?? '';
    }
}
```

#### Disadvantages of This Approach
- **Less readable**: Logic is hidden in separate methods.
- **Naming conflicts**: Higher chance of conflicts with other methods.
- **Less flexible**: Harder to combine and maintain.

## Routing

### URL Structure

Public-facing URLs must use **kebab-case** to ensure consistency and readability.

:::tip[good]
```
https://msml.nl/about-us
https://msml.nl/blog/software-development-tips
```
:::

:::warning[bad]
```
https://msml.nl/AboutUs
https://msml.nl/blog/softwareDevelopmentTips
```
:::

### Route Definition

Prefer to use the route tuple notation whenever possible, as it is more explicit and type-safe.

:::tip[good]
```php
Route::get('about-us', [AboutUsController::class, 'index']);
```
:::

:::warning[bad]
```php
Route::get('about-us', 'OpenSourceController@index');
```
:::



### Route Names

Route names must use **camelCase** for consistency.

:::tip[good]
```php
Route::get('open-source', [OpenSourceController::class, 'index'])->name('openSource');
```
:::

:::warning[bad]
```php
Route::get('open-source', [OpenSourceController::class, 'index'])->name('open-source');
```
:::



### HTTP Verb Placement

Always place the HTTP verb first in the route definition. This makes routes more scannable and consistent.

:::tip[good]
```php
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('open-source', [OpenSourceController::class, 'index'])->name('openSource');
```
:::

:::warning[bad]
```php
Route::name('home')->get('/', [HomeController::class, 'index']);
Route::name('openSource')->get([OpenSourceController::class, 'index']);
```
:::



### Route Parameters

Use **camelCase** for route parameters.

:::tip[good]
```php
Route::get('news/{newsItem}', [NewsItemController::class, 'show']);
```
:::

:::warning[bad]
```php
Route::get('news/{news_item}', [NewsItemController::class, 'show']);
```
:::



### URL Formatting

Routes should not start with a `/` unless the URL would otherwise be empty.

:::tip[good]
```php
Route::get('/', [HomeController::class, 'index']);
Route::get('open-source', [OpenSourceController::class, 'index']);
```
:::

:::warning[bad]
```php
Route::get('', [HomeController::class, 'index']);
Route::get('/open-source', [OpenSourceController::class, 'index']);
```
:::

## API Routing

### Naming Conventions
1. Use the **plural** form of the resource name to reflect collections. For example, `users` instead of `user`.
2. Always use **kebab-case** for resource names to maintain consistency and readability.

#### Examples

:::tip[good]
```
/api/users
/api/posts
```
:::

:::warning[bad]
```
/api/user
/api_posts
```
:::



### Route Structure

#### Limit Deep Nesting
Deeply nested routes make APIs harder to manage and understand. Avoid nesting beyond two levels whenever possible. Flatten routes for simplicity.

:::tip[good]
```
/organisations/1/users
/users/1/posts
```
:::

:::warning[bad]
```
/organisations/1/users/1/posts/1
```
:::

#### Provide Context When Necessary
Nesting can be used sparingly when it provides meaningful context between related resources. For example, when accessing all users of a specific organization, nesting `users` under `organisations` is appropriate.

:::tip[good]
```
/organisations/1/users
```
:::

#### Flatten for Independence
When operations on a resource are independent of its parent, flatten the route structure.

:::tip[good]
```
/users/1
```
:::



### Additional Guidelines
- **HTTP Verbs:** Use proper HTTP verbs for route actions (e.g., `GET`, `POST`, `PUT`, `DELETE`).
- **Versioning:** Prefix API routes with a version number to ensure backward compatibility.

#### Example
```php
Route::prefix('v1')->group(function () {
    Route::get('users', [UserController::class, 'index']);
    Route::get('users/{user}', [UserController::class, 'show']);
    Route::post('users', [UserController::class, 'store']);
    Route::put('users/{user}', [UserController::class, 'update']);
    Route::delete('users/{user}', [UserController::class, 'destroy']);
});
```

Following these conventions ensures a clean, scalable, and consistent API design.

## Controllers

Controllers that control a resource must use the plural resource name.

```php
class PostController
{
    // ...
}
```

Try to keep controllers simple and stick to the default CRUD keywords (`index`, `create`, `store`, `show`, `edit`, `update`, `destroy`). Extract a new controller if you need other actions.

In the following example, we could have `PostController@favorite`, and `PostController@unfavorite`, or we could extract it to a separate `FavoritePostController`.

```php
class PostController
{
    public function create()
    {
        // ...
    }

    // ...

    public function favorite(Post $post)
    {
        request()->user()->favorites()->attach($post);

        return response(null, 200);
    }

    public function unfavorite(Post $post)
    {
        request()->user()->favorites()->detach($post);

        return response(null, 200);
    }
}
```

Here we fall back to default CRUD words, `store` and `destroy`.

```php
class FavoritePostController
{
    public function store(Post $post)
    {
        request()->user()->favorites()->attach($post);

        return response(null, 200);
    }

    public function destroy(Post $post)
    {
        request()->user()->favorites()->detach($post);

        return response(null, 200);
    }
}
```

This is a loose guideline that doesn't need to be enforced.

## Views

View files must use camelCase.

```
resources/
  views/
    openSource.blade.php
```

```php
class OpenSourceController
{
    public function index() {
        return view('openSource');
    }
}
```

## Validation

When using multiple rules for one field in a form request, avoid using `|`, always use array notation. Using an array notation will make it easier to apply custom rule classes to a field.

:::tip[good]
```php
public function rules()
{
    return [
        'email' => ['required', 'email'],
    ];
}
```
:::

:::warning[bad]
```php
public function rules()
{
    return [
        'email' => 'required|email',
    ];
}
```
:::


All custom validation rules must use snake_case:

```php
Validator::extend('organisation_type', function ($attribute, $value) {
    return OrganisationType::isValid($value);
});
```

## Blade Templates

Indent using four spaces.

```html
<a href="/open-source">
    Open Source
</a>
```

Don't add spaces after control structures.

```html
@if($condition)
    Something
@endif
```

## Authorization

Policies must use camelCase.

```php
Gate::define('editPost', function ($user, $post) {
    return $user->id == $post->user_id;
});
```

```html
@can('editPost', $post)
    <a href="{{ route('posts.edit', $post) }}">
        Edit
    </a>
@endcan
```

Try to name abilities using default CRUD words. One exception: replace `show` with `view`. A server shows a resource, a user views it.

## Translations

Translations must be rendered with the `__` function. We prefer using this over `@lang` in Blade views because `__` can be used in both Blade views and regular PHP code. Here's an example:

```php
<h2>{{ __('newsletter.form.title') }}</h2>

{!!__('newsletter.form.description') !!}
```

## Naming Classes

Naming classes consistently improves code readability, maintainability, and reduces naming conflicts. Below are guidelines for naming different class types, along with examples using namespaces.

### General Rules
- Use **PascalCase** for class names.
- Avoid abbreviations unless they are well-known.
- Include suffixes like `Controller`, `Resource`, `Listener`, etc., to clarify intent and avoid naming conflicts.
- Follow a consistent folder structure to group related classes logically.

### Controllers

#### Naming Convention:
- **Resourceful Controllers:** Use the plural form of the resource, suffixed with `Controller`.
  - Example:  
    **`App\Http\Controllers\UsersController`**  
    Handles actions for user resources.

- **Non-resourceful Controllers:** Name after the specific action, suffixed with `Controller`.  
  - Example:  
    **`App\Http\Controllers\GenerateReportController`**  
    Handles generating a specific report.

- **Folder Structure:** Group controllers by domain or functionality.
  - Example Folder Structure:
    ```
    Http
    ├── Controllers
    │   ├── Api
    │   ├── Portal
    │   │   ├── Auth
    │   │   ├── Calendar
    │   │   ├── Dashboard
    │   │   ├── News
    │   │   ├── Profile
    │   │   │   ├── ProfileController.php
    │   │   │   ├── ProfileSettingsController.php
    │   │   ├── Roles
    │   │   ├── Settings
    │   │   ├── Users
    │   │       └── UserController.php
    ```

### Resources (and Transformers)

#### Naming Convention:
- Use the plural form of the resource, suffixed with `Resource` or `Transformer`.  
  - Examples:  
    **`App\Http\Resources\Api\Users\UserResource`**  
    A resource representation for an individual user for API endpoints.  
    **`App\Http\Resources\Portal\Users\UserResource`**  
    A resource representation for an individual user for portal-specific views.  
    **`App\Transformers\Users\UserTransformer`**  
    A transformer for formatting user data.



### Request Classes

#### Naming Convention:
- Requests should describe their purpose, suffixed with `Request`.
  - Examples:  
    **`App\Http\Requests\Api\Users\StoreUserRequest`**  
    Validates input for creating a new user through API endpoints.  
    **`App\Http\Requests\Portal\Users\StoreUserRequest`**  
    Validates input for creating a new user in portal-specific views.  
    **`App\Http\Requests\Api\Users\UpdateUserRequest`**  
    Validates input for updating an existing user through API endpoints.  
    **`App\Http\Requests\Portal\Users\UpdateUserRequest`**  
    Validates input for updating an existing user in portal-specific views.  

### Jobs

#### Naming Convention:
- Use an action-oriented name to describe the job.
  - Examples:  
    **`App\Jobs\Users\CreateUserJob`**  
    Handles user creation logic.  
    **`App\Jobs\Reports\GenerateMonthlyReportJob`**  
    Generates monthly reports asynchronously.

### Events

#### Naming Convention:
- Use tense to reflect timing consistently:
  - **Before Action:** Use present participle.  
    Example: **`App\Events\Users\UserCreating`**  
  - **After Action:** Use past tense.  
    Example: **`App\Events\Users\UserCreated`**  

- **Folder Structure:** Organize by domain for consistency.
  - Example:
    ```
    Events
    ├── Users
    │   ├── UserCreating.php
    │   └── UserCreated.php
    ```

### Listeners

#### Naming Convention:
- Reflect the action performed, suffixed with `Listener`.  
  - Example:  
    **`App\Listeners\Users\SendWelcomeEmailListener`**  
    Sends a welcome email when a user is created.

### Commands

#### Naming Convention:
- Describe the action, suffixed with `Command`.  
  - Example:  
    **`App\Console\Commands\PublishScheduledPostsCommand`**  
    Publishes scheduled posts via the CLI.

### Mailables

#### Naming Convention:
- Describe the purpose, suffixed with `Mail`.  
  - Examples:  
    **`App\Mail\Users\WelcomeUserMail`**  
    Sends a welcome email to a new user.  
    **`App\Mail\Reports\MonthlyReportMail`**  
    Emails the monthly report to recipients.

### Enums

#### Naming Convention:
- Use descriptive names without prefixes or suffixes.
  - Examples:  
    **`App\Enums\OrderStatus`**  
    Enum for order status types.  
    **`App\Enums\UserRole`**  
    Enum for user roles.

### Example Directory Structure

```
App
├── Http
│   ├── Controllers
│   │   ├── Api
│   │   ├── Portal
│   │   │   ├── Auth
│   │   │   ├── Calendar
│   │   │   ├── Dashboard
│   │   │   ├── News
│   │   │   ├── Profile
│   │   │   │   ├── ProfileController.php
│   │   │   │   ├── ProfileSettingsController.php
│   │   │   ├── Roles
│   │   │   ├── Settings
│   │   │   ├── Users
│   │   │       └── UserController.php
├── Events
│   ├── Users
│   │   ├── UserCreating.php
│   │   └── UserCreated.php
├── Requests
│   ├── Api
│   │   ├── Portal
│   │       └── Auth
│   │           ├── StoreUserRequest.php
│   │           └── UpdateUserRequest.php
│   ├── Portal
│   │   ├── Users
│   │   │   ├── StoreUserRequest.php
│   │   │   └── UpdateUserRequest.php
├── Resources
│   ├── Api
│   │   ├── Users
│   │   │   └── UserResource.php
│   ├── Portal
│   │   ├── Users
│   │   │   └── UserResource.php
├── Jobs
│   ├── Users
│   │   └── CreateUserJob.php
```
