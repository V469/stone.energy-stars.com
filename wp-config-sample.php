<?php
/**
 * Базова конфігурація WordPress.
 * Цей файл є прикладом налаштувань. Скопіюйте його як wp-config.php
 * і заповніть своїми даними.
 */

// ** Налаштування MySQL ** //
/** Ім'я бази даних для WordPress */
define( 'DB_NAME', 'your_database_name' );

/** Ім'я користувача MySQL */
define( 'DB_USER', 'your_database_user' );

/** Пароль до бази даних MySQL */
define( 'DB_PASSWORD', 'your_database_password' );

/** Адреса сервера MySQL */
define( 'DB_HOST', 'localhost' );

/** Кодування бази даних */
define( 'DB_CHARSET', 'utf8mb4' );

/** Схема порівняння */
define( 'DB_COLLATE', '' );

/**
 * Унікальні ключі та солі автентифікації.
 * Згенеруйте їх на https://api.wordpress.org/secret-key/1.1/salt/
 */
define( 'AUTH_KEY',         'впишіть_свій_унікальний_ключ' );
define( 'SECURE_AUTH_KEY',  'впишіть_свій_унікальний_ключ' );
define( 'LOGGED_IN_KEY',    'впишіть_свій_унікальний_ключ' );
define( 'NONCE_KEY',        'впишіть_свій_унікальний_ключ' );
define( 'AUTH_SALT',        'впишіть_свій_унікальний_ключ' );
define( 'SECURE_AUTH_SALT', 'впишіть_свій_унікальний_ключ' );
define( 'LOGGED_IN_SALT',   'впишіть_свій_унікальний_ключ' );
define( 'NONCE_SALT',       'впишіть_свій_унікальний_ключ' );

/**
 * Префікс таблиць для бази даних WordPress.
 */
$table_prefix = 'wp_';

/**
 * Налаштування режиму налагодження.
 * Рекомендується вимкнути для продакшену.
 */
define( 'WP_DEBUG', false );

/* Це все, припиніть редагування! Успішного блогування. */

/** Абсолютний шлях до директорії WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}

/** Інсталяція WordPress */
require_once ABSPATH . 'wp-settings.php';

