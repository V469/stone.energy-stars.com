<?php
define( 'WP_CACHE', true );





/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'mirweb_wp393' );

/** Database username */
define( 'DB_USER', 'mirweb_wp393' );

/** Database password */
define( 'DB_PASSWORD', 'S)6(g3pS99' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'htxia4dfylsthjxutshm8dvdxaycbvlpqu3ulvxxhrpgcg26dllyriyvgwxxcdsk' );
define( 'SECURE_AUTH_KEY',  'z10hq4y2rjaz8bdxm6s9bsl7clz5mrthksik9rv1voyxxaxclufmczmatety1obs' );
define( 'LOGGED_IN_KEY',    'cymufvmawcxkuuwmyssznrck9jlyssvbwpme71ihmd3wleashflkz1il8bk6azz5' );
define( 'NONCE_KEY',        'bllozqxaqqvkpocuu2yqfydsitwadjb60qg06yfbeowsfvoeyto5qxf57s5peidw' );
define( 'AUTH_SALT',        'pwtjyymgovaozgep5q6y8vjjdypammw4pmu9y4cxcwbcudwww8flcxyzft4vaid5' );
define( 'SECURE_AUTH_SALT', 'jozazj4de6pob4yd8arb7lxqo7zl8tc5ukmcc2wafcfoxtxugpoe7qmm1unzkbh4' );
define( 'LOGGED_IN_SALT',   'lqbrmhrvejonceisabxg7otn7xmj9pf3vprs5hgsrppktb3ir3o0mwqttygf1uow' );
define( 'NONCE_SALT',       'cjebqemwm0bq0fscuip5shr0s7xnorqasixic7eebzgafhxpgbuds32tqdefxp5q' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wpos_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */

set_time_limit(300);

define('WP_MEMORY_LIMIT','512M');

@ini_set('upload_max_size' , '512M' );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
