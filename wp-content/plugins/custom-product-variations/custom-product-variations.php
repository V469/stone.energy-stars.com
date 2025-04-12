<?php
/**
 * Plugin Name: Custom Product Variations
 * Description: Кастомні варіації продуктів з системою верифікації користувачів
 * Version: 1.0.0
 * Author: Your Name
 */

// Заборона прямого доступу
if (!defined('ABSPATH')) {
    exit;
}

// Підключаємо клас верифікації
require_once plugin_dir_path(__FILE__) . 'includes/class-user-verification.php';

// Додаємо хуки для активації/деактивації плагіну
register_activation_hook(__FILE__, 'custom_variations_activate');
register_deactivation_hook(__FILE__, 'custom_variations_deactivate');

/**
 * Активація плагіну
 */
function custom_variations_activate() {
    // Створюємо таблицю верифікації
    $verification = new Custom_User_Verification();
    $verification->create_verification_table();
    
    // Створюємо сторінку верифікації, якщо її немає
    $verification_page = get_page_by_path('verification');
    if (!$verification_page) {
        wp_insert_post(array(
            'post_title' => 'Верифікація',
            'post_name' => 'verification',
            'post_status' => 'publish',
            'post_type' => 'page',
            'post_content' => '[user_verification_form]' // Шорткод для форми верифікації
        ));
    }
}

/**
 * Деактивація плагіну
 */
function custom_variations_deactivate() {
    // Можна додати очищення даних при деактивації
}

// Додаємо шорткод для форми верифікації
add_shortcode('user_verification_form', 'render_verification_form');

/**
 * Рендеринг форми верифікації
 */
function render_verification_form() {
    ob_start();
    ?>
    <div class="verification-form-container">
        <form class="verification-form">
            <h2>Верифікація користувача</h2>
            <p>Для доступу до замовлень необхідно пройти верифікацію</p>
            
            <div class="form-group">
                <label for="verification-email">Email:</label>
                <input type="email" id="verification-email" name="email" required>
            </div>
            
            <button type="submit" class="button button-primary">Відправити код верифікації</button>
        </form>
    </div>
    
    <style>
        .verification-form-container {
            max-width: 500px;
            margin: 30px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .verification-form h2 {
            color: #333;
            margin-bottom: 20px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #666;
        }
        
        .form-group input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .verification-form button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .verification-form button:hover {
            background: #45a049;
        }
    </style>
    <?php
    return ob_get_clean();
}

// Підключаємо скрипти та стилі
add_action('wp_enqueue_scripts', 'custom_variations_scripts');

function custom_variations_scripts() {
    wp_enqueue_script(
        'custom-variations',
        plugins_url('/js/custom-variations.js', __FILE__),
        array('jquery'),
        '1.0.0',
        true
    );
}

class Custom_Product_Variations {
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('woocommerce_before_add_to_cart_button', array($this, 'render_variation_buttons'));
        add_action('wp_head', array($this, 'add_custom_styles'));
    }

    public function enqueue_scripts() {
        if (!is_product()) {
            return;
        }

        wp_enqueue_script(
            'custom-variations',
            plugins_url('js/custom-variations.js', __FILE__),
            array('jquery'),
            '1.1.0',
            true
        );
    }

    public function add_custom_styles() {
        if (!is_product()) {
            return;
        }
        ?>
        <style>
            /* Основні стилі для кнопок */
            .custom-variation-buttons {
                display: flex;
                gap: 12px;
                margin: 20px 0;
            }

            .variation-button {
                flex: 1;
                display: inline-flex !important;
                align-items: center;
                justify-content: center !important;
                gap: 8px;
                padding: 12px 24px !important;
                height: 50px !important;
                min-height: 50px !important;
                border: 2px solid #4CAF50 !important;
                border-radius: 8px !important;
                background: white !important;
                cursor: pointer;
                transition: all 0.3s ease !important;
                font-size: 16px !important;
                font-weight: 600 !important;
                color: #4CAF50 !important;
                min-width: 120px;
                box-shadow: 0 2px 4px rgba(76, 175, 80, 0.1) !important;
            }

            .variation-button .icon {
                font-size: 20px;
                transition: transform 0.3s ease;
            }

            .variation-button:hover {
                background: #4CAF50 !important;
                color: white !important;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(76, 175, 80, 0.2) !important;
            }

            .variation-button.active {
                background: #4CAF50 !important;
                color: white !important;
                box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3) !important;
            }

            /* Стилі для ціни */
            .price-range {
                display: inline-block !important;
                font-size: 24px !important;
                font-weight: 600 !important;
                color: #4CAF50 !important;
                margin: 15px 0 !important;
                padding: 8px 16px !important;
                border-radius: 8px !important;
                background: rgba(76, 175, 80, 0.1) !important;
            }

            /* Стилі для попапу */
            .wholesale-popup {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(3px);
                z-index: 999999;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .wholesale-popup.active {
                display: flex !important;
            }

            .wholesale-popup-content {
                background: white;
                padding: 30px;
                border-radius: 15px;
                position: relative;
                width: 100%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            }

            .wholesale-popup h2 {
                font-size: 24px !important;
                color: #333 !important;
                margin-bottom: 10px !important;
                text-align: center;
            }

            .wholesale-popup p {
                color: #666 !important;
                text-align: center;
                margin-bottom: 20px !important;
            }

            .wholesale-benefits {
                margin: 20px 0;
            }

            .benefit-item {
                display: flex;
                align-items: center;
                margin: 10px 0;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
                transition: all 0.3s ease;
            }

            .benefit-item:hover {
                background: #f0f9f0;
                transform: translateX(5px);
            }

            .benefit-icon {
                font-size: 24px;
                margin-right: 15px;
            }

            .wholesale-form {
                margin-top: 25px;
            }

            .wholesale-form .form-group {
                margin-bottom: 15px;
            }

            .wholesale-form input,
            .wholesale-form textarea {
                width: 100%;
                padding: 12px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 15px;
                transition: all 0.3s ease;
            }

            .wholesale-form input:focus,
            .wholesale-form textarea:focus {
                border-color: #4CAF50;
                outline: none;
                box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
            }

            .wholesale-form button {
                width: 100%;
                padding: 14px;
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .wholesale-form button:hover {
                background: #3d8b40;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(76, 175, 80, 0.2);
            }

            .close-popup {
                position: absolute;
                right: 15px;
                top: 15px;
                width: 30px;
                height: 30px;
                background: white;
                border: none;
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                transition: all 0.3s ease;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }

            .close-popup:hover {
                background: #f8f9fa;
                color: #333;
                transform: rotate(90deg);
            }

            /* Адаптивність */
            @media (max-width: 768px) {
                .custom-variation-buttons {
                    flex-direction: column;
                }

                .variation-button {
                    width: 100%;
                }

                .wholesale-popup-content {
                    padding: 20px;
                }
            }

            /* Приховуємо стандартні елементи WooCommerce */
            .woocommerce div.product form.cart .variations,
            .woocommerce div.product form.cart .reset_variations,
            .woocommerce div.product p.price,
            .woocommerce div.product span.price {
                display: none !important;
            }
        </style>
        <?php
    }

    public function render_variation_buttons() {
        ?>
        <div class="custom-variation-buttons">
            <button type="button" class="variation-button" data-variation="kg">
                <span class="icon">⚖️</span>
                <span>КГ</span>
            </button>
            <button type="button" class="variation-button" data-variation="tn">
                <span class="icon">🚛</span>
                <span>ТН</span>
            </button>
            <button type="button" class="variation-button" data-variation="opt">
                <span class="icon">👥</span>
                <span>ОПТ</span>
            </button>
        </div>
        <div class="price-range" data-unit="kg">24.0 ₴</div>
        
        <div id="wholesale-popup" class="wholesale-popup">
            <div class="wholesale-popup-content">
                <button class="close-popup">×</button>
                
                <h2>Оптові замовлення</h2>
                <p>Залиште свої контакти, і наш менеджер зв'яжеться з вами</p>

                <div class="wholesale-benefits">
                    <div class="benefit-item">
                        <span class="benefit-icon">💰</span>
                        <span>Спеціальні ціни для оптових замовлень</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">🚚</span>
                        <span>Безкоштовна доставка від певної суми</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">📦</span>
                        <span>Індивідуальні умови співпраці</span>
                    </div>
                </div>

                <form class="wholesale-form">
                    <div class="form-group">
                        <input type="text" name="name" placeholder="Ваше ім'я" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Номер телефону" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <textarea name="message" placeholder="Повідомлення" rows="4"></textarea>
                    </div>
                    <button type="submit">Відправити запит</button>
                </form>
            </div>
        </div>
        <?php
    }
}

// Initialize plugin
new Custom_Product_Variations(); 