<?php
/**
 * Клас для управління верифікацією користувачів
 */
class Custom_User_Verification {
    private $table_name;
    
    public function __construct() {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'custom_user_verification';
        
        // Створюємо таблицю при активації
        add_action('init', array($this, 'create_verification_table'));
        
        // Додаємо API endpoints
        add_action('rest_api_init', array($this, 'register_api_routes'));
        
        // Додаємо скрипт для перевірки статусу
        add_action('wp_enqueue_scripts', array($this, 'enqueue_verification_script'));
        
        // Додаємо пункт меню в адмінку
        add_action('admin_menu', array($this, 'add_admin_menu'));
    }
    
    /**
     * Створення таблиці верифікації
     */
    public function create_verification_table() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE IF NOT EXISTS {$this->table_name} (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            user_email varchar(100) NOT NULL,
            user_phone varchar(20),
            verification_status varchar(20) NOT NULL DEFAULT 'pending',
            verification_type varchar(20) NOT NULL DEFAULT 'email',
            verification_date datetime DEFAULT CURRENT_TIMESTAMP,
            verification_code varchar(32),
            verification_expires datetime,
            verification_data text,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            UNIQUE KEY user_email (user_email)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    /**
     * Реєстрація API маршрутів
     */
    public function register_api_routes() {
        register_rest_route('custom-verification/v1', '/status', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_verification_status'),
            'permission_callback' => '__return_true'
        ));
        
        register_rest_route('custom-verification/v1', '/verify', array(
            'methods' => 'POST',
            'callback' => array($this, 'start_verification'),
            'permission_callback' => '__return_true'
        ));
    }
    
    /**
     * Додавання скрипту перевірки статусу
     */
    public function enqueue_verification_script() {
        wp_enqueue_script(
            'custom-verification',
            plugins_url('/js/verification.js', dirname(__FILE__)),
            array('jquery'),
            '1.0.0',
            true
        );
        
        // Передаємо статус верифікації в JavaScript
        $verification_status = $this->get_user_verification_status();
        wp_localize_script('custom-verification', 'verificationData', array(
            'status' => $verification_status,
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('custom-verification-nonce')
        ));
    }
    
    /**
     * Отримання статусу верифікації користувача
     */
    public function get_user_verification_status() {
        global $wpdb;
        
        // Спочатку перевіряємо авторизованого користувача
        $current_user = wp_get_current_user();
        if ($current_user->ID) {
            $email = $current_user->user_email;
        } else {
            // Для неавторизованих можемо перевірити по сесії або cookie
            $email = isset($_COOKIE['guest_email']) ? sanitize_email($_COOKIE['guest_email']) : '';
        }
        
        if (!empty($email)) {
            $result = $wpdb->get_var($wpdb->prepare(
                "SELECT verification_status FROM {$this->table_name} WHERE user_email = %s",
                $email
            ));
            
            return $result ? $result : 'pending';
        }
        
        return 'pending';
    }
    
    /**
     * Додавання меню в адмінку
     */
    public function add_admin_menu() {
        add_menu_page(
            'Верифікація користувачів',
            'Верифікація',
            'manage_options',
            'user-verification',
            array($this, 'render_admin_page'),
            'dashicons-shield',
            30
        );
    }
    
    /**
     * Рендеринг сторінки адмінки
     */
    public function render_admin_page() {
        include plugin_dir_path(__FILE__) . 'templates/admin-verification.php';
    }
}

// Ініціалізація класу
new Custom_User_Verification(); 