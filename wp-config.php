<?php
// ** Database settings - Local development ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'mirweb_wp393' );

/** Database username */
define( 'DB_USER', 'mirweb_wp393' );

/** Database password */
define( 'DB_PASSWORD', 'LocalWP@393' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

// Enable debugging for local development
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

// Disable automatic updates for local development
define('AUTOMATIC_UPDATER_DISABLED', true);

// Disable display of errors on front-end
@ini_set('display_errors', 0);
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT & ~E_WARNING);

$table_prefix = 'wpos_';

// Copy the existing salts from wp-config.php
define( 'AUTH_KEY',         'htxia4dfylsthjxutshm8dvdxaycbvlpqu3ulvxxhrpgcg26dllyriyvgwxxcdsk' );
define( 'SECURE_AUTH_KEY',  'z10hq4y2rjaz8bdxm6s9bsl7clz5mrthksik9rv1voyxxaxclufmczmatety1obs' );
define( 'LOGGED_IN_KEY',    'cymufvmawcxkuuwmyssznrck9jlyssvbwpme71ihmd3wleashflkz1il8bk6azz5' );
define( 'NONCE_KEY',        'bllozqxaqqvkpocuu2yqfydsitwadjb60qg06yfbeowsfvoeyto5qxf57s5peidw' );
define( 'AUTH_SALT',        'pwtjyymgovaozgep5q6y8vjjdypammw4pmu9y4cxcwbcudwww8flcxyzft4vaid5' );
define( 'SECURE_AUTH_SALT', 'jozazj4de6pob4yd8arb7lxqo7zl8tc5ukmcc2wafcfoxtxugpoe7qmm1unzkbh4' );
define( 'LOGGED_IN_SALT',   'lqbrmhrvejonceisabxg7otn7xmj9pf3vprs5hgsrppktb3ir3o0mwqttygf1uow' );
define( 'NONCE_SALT',       'cjebqemwm0bq0fscuip5shr0s7xnorqasixic7eebzgafhxpgbuds32tqdefxp5q' );

define('WP_HOME','http://localhost/stone.energy-stars.com');
define('WP_SITEURL','http://localhost/stone.energy-stars.com');

// Налаштування відображення помилок
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT & ~E_WARNING);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', dirname(__FILE__) . '/wp-content/debug.log');

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php'; 