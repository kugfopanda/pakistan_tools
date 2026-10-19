# Pakistan Online Tools

Server-rendered Laravel application for calculators, education utilities, file tools, and editorial content. The public UI is built with Blade, Alpine.js, Tailwind CSS, and Vite; the admin panel uses Filament.

## Requirements

- PHP 8.3 or newer with `gd`, `intl`, `mbstring`, `pdo_mysql` (or `pdo_sqlite` for local development), and standard Laravel extensions
- Composer 2
- Node.js 20 or newer and npm
- MySQL 8 recommended for production; SQLite is suitable for local development

## Local Development

From the project directory:

```sh
composer install
npm ci
cp .env.example .env
php artisan key:generate
```

Configure the local database in `.env`, then initialize the database and public uploads:

```sh
php artisan migrate --seed
php artisan storage:link
```

Start the Laravel server and Vite in separate terminals:

```sh
php artisan serve
npm run dev
```

Run the test suite with `php artisan test`. Create an admin account with `php artisan make:filament-user`.

## Production Deployment

1. Point the web server document root at this project's `public/` directory. Enable HTTPS and ensure `storage/` and `bootstrap/cache/` are writable by the application user.
2. Install production dependencies and build the frontend:

   ```sh
   composer install --no-dev --prefer-dist --optimize-autoloader
   npm ci
   npm run build
   ```

3. Provide environment values through the host's secret/environment manager. Set `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL` to the HTTPS site URL, a strong unique `APP_KEY`, and production database credentials. Never commit `.env` or reuse an application key.
4. On a fresh database, run migrations and seed only after reviewing seed content. Seeded bank rates are sample values and must be replaced with verified rates before public launch. Review the published tool and article content as well.

   ```sh
   php artisan migrate --force
   php artisan db:seed --force
   php artisan storage:link
   ```

5. Cache production configuration and views with `php artisan optimize`.
6. Configure one scheduler invocation per minute:

   ```cron
   * * * * * cd /path/to/pakistan-tools && php artisan schedule:run >> /dev/null 2>&1
   ```

   Run a queue worker only if production features dispatch queued jobs. This project does not include Laravel Horizon.
7. Before switching traffic, check `/up`, `/robots.txt`, `/sitemap.xml`, a representative tool page, `/admin`, and the browser console. Confirm the PWA icons load and verify that backups cover the database and `storage/app/public`.

## Optional Integrations

- Configure Meilisearch and `SCOUT_DRIVER=meilisearch` to enable indexed search; otherwise use the configured Scout driver.
- Configure Cloudflare or another CDN to bypass `/admin*`, `/api/*`, `/livewire/*`, and `/search*`. Do not cache authenticated or private responses.
- Configure Turnstile, mail delivery, ad slots, and verified bank-rate content before enabling the related production features.

## Useful Commands

```sh
php artisan test
php artisan route:list
php artisan schedule:list
npm run build
```