# Guidelines

**Artisanal baked code**

## About Laravel
First and foremost, Laravel provides the most value when you write things the way Laravel intended you to write. If there's a documented way to achieve something, follow it. Whenever you do something differently, make sure you have a justification for why you didn't follow the defaults.

---

## General PHP Rules
- Code style must follow PSR-1, PSR-2, and PSR-12.
- Use camelCase for anything string-like that's not public-facing.
- Examples and detailed conventions are provided in relevant sections.

---

## Class Defaults
- Avoid using `final` by default.
- Open-source users are responsible for testing overwritten behavior.

---

## Nullable and Union Types
- Use the short nullable notation when possible:

```php
public ?string $variable;
```
Instead of:
```php
public string | null $variable;
```

---

## Void Return Types
- Always indicate methods that return nothing with `void`:

```php
public function scopeArchived(Builder $query): void
{
    $query->where('archived', true);
}
```

---

## Typed Properties
- Use type declarations for properties whenever possible, avoiding docblocks:

```php
class Foo
{
    public string $bar;
}
```

---

## Enums
- Use PascalCase for enum values:

```php
enum Suit {
    case Clubs;
    case Diamonds;
    case Hearts;
    case Spades;
}

Suit::Diamonds;
```

---

## Docblocks
- Avoid docblocks for fully type-hinted methods unless additional context is necessary.
- Use full sentences for descriptions, ending with a period.

Example:
```php
/**
 * Create a URL from a string.
 */
public static function fromString(string $url): Url
{
    return new Url($url);
}
```
- Always import classnames in docblocks:

```php
use \Illuminate\Support\Collection;

/** @return Collection<int, SomeObject> */
function someFunction(): Collection
{
    // ...
}
```
- Use single-line docblocks where possible:
```php
/** @var string */
```

---

## Constructor Property Promotion
- Use constructor property promotion where applicable. Place each property on its own line and include a trailing comma:

```php
class MyClass {
    public function __construct(
        protected string $firstArgument,
        protected string $secondArgument,
    ) {}
}
```

---

## Traits
- Declare each trait on its own line to ensure clean diffs when traits are added or removed:

```php
class MyClass
{
    use TraitA;
    use TraitB;
}
```

---

## Strings
- Prefer string interpolation over `sprintf` or concatenation:

```php
$greeting = "Hi, I am {$name}.";
```

---

## Ternary Operators
- Break ternary expressions into multiple lines if they are long:

```php
$result = $object instanceof Model
    ? $object->name
    : 'A default value';
```

---

## If Statements
- Always use curly brackets for clarity:

```php
if ($condition) {
    // ...
}
```
- Favor the "happy path": place it last and refactor `else` blocks into early returns:

```php
if (! $condition) {
    throw new Exception;
}

// Happy path here.
```

---

## Comments
- Write expressive code to minimize the need for comments.
- Format comments properly:

```php
// A single line comment with a space.

/*
 * Use block comments for detailed explanations.
 */
```

---

## Whitespace
- Add blank lines between logical groups of statements for readability:

```php
public function getPage($url)
{
    $page = $this->pages()->where('slug', $url)->first();

    if (! $page) {
        return null;
    }

    return $page;
}
```

---

## Configuration
- Use kebab-case for configuration filenames and snake_case for keys:

```php
// config/pdf-generator.php
return [
    'chrome_path' => env('CHROME_PATH'),
];
```
- Avoid using the `env` helper outside of configuration files.

---

## Artisan Commands
- Use kebab-case for command names:

```bash
php artisan delete-old-records
```
- Provide feedback within the `handle` method:

```php
public function handle()
{
    $this->comment('All ok!');
}
```

---

## Routing
- Use tuple notation for controller routes:

```php
Route::get('open-source', [OpenSourceController::class, 'index']);
```
- Use camelCase for route parameters:

```php
Route::get('news/{newsItem}', [NewsController::class, 'show']);
```

---

## Validation
- Use array notation for form request rules:

```php
public function rules()
{
    return [
        'email' => ['required', 'email'],
    ];
}
```

---

## Blade Templates
- Indent with four spaces and avoid extra spaces after control structures:

```php
@if($condition)
    Something
@endif
```

---

## Authorization
- Use camelCase for policy abilities and replace `show` with `view` where applicable.

```php
Gate::define('editPost', function ($user, $post) {
    return $user->id === $post->user_id;
});
```

---

## Naming Classes
- Follow naming conventions for classes (e.g., `UsersController`, `CreateUserJob`). Suffix classes appropriately to avoid naming collisions.

---
