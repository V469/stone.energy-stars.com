<?php
/**
 * Decor Child Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Decor Child
 * @since 1.0.0
 */

/**
 * Define Constants
 */
define( 'CHILD_THEME_DECOR_CHILD_VERSION', '1.0.0' );

/**
 * Enqueue styles
 */
function child_enqueue_styles() {

	wp_enqueue_style( 'decor-child-theme-css', get_stylesheet_directory_uri() . '/style.css', array('astra-theme-css'), CHILD_THEME_DECOR_CHILD_VERSION, 'all' );

}

add_action( 'wp_enqueue_scripts', 'child_enqueue_styles', 15 );

//Subtotal Hide
remove_action( 'woocommerce_single_product_summary', '__return_false', 20);

//Checkout hide subtotal
add_filter( 'woocommerce_get_order_item_totals', 'remove_subtotal_from_orders_total_lines', 100, 1 );
function remove_subtotal_from_orders_total_lines( $totals ) {
    unset($totals['cart_subtotal']  );
    return $totals;
} 

//Gallery slider
add_action( 'wp_enqueue_scripts', 'gallery_scripts', 20 );

function gallery_scripts() {
    if ( is_archive()) {
        if ( current_theme_supports( 'wc-product-gallery-zoom' ) ) { 
            wp_enqueue_script( 'zoom' );
        }
        if ( current_theme_supports( 'wc-product-gallery-slider' ) ) {
            wp_enqueue_script( 'flexslider' );
        }
        if ( current_theme_supports( 'wc-product-gallery-lightbox' ) ) {
            wp_enqueue_script( 'photoswipe-ui-default' );
            wp_enqueue_style( 'photoswipe-default-skin' );
            add_action( 'wp_footer', 'woocommerce_photoswipe' );
        }
        wp_enqueue_script( 'wc-single-product' );
    }

}

//Check field
add_filter( 'woocommerce_checkout_fields' , 'ecommercehints_change_checkout_placeholders', 9999 );
 
function ecommercehints_change_checkout_placeholders( $f ) {
 
   // first name can be changed with woocommerce_default_address_fields as well
   $f['billing']['billing_first_name']['placeholder'] = 'As it appears on your ID';
 
   return $f;
 
}

/**
 * remove_admin_bar
 *
 * @return void
 */
function ibanner_remove_admin_bar_for_non_admins() {
    if (!current_user_can('administrator') && !is_admin()) {
        show_admin_bar(false);
    }
}

add_action('after_setup_theme', 'ibanner_remove_admin_bar_for_non_admins');

function remove_dashboard_menu_items() {
    global $menu;
    // Uncomment the lines below to exclude specific menu items
    unset($menu[5]);    // Removes "Posts"
    //unset($menu[10]);   // Removes "Media"
    //unset($menu[20]);   // Removes "Pages"
    unset($menu[25]);   // Removes "Comments"
    //unset($menu[60]);   // Removes "Appearance"
    //unset($menu[65]);   // Removes "Plugins"
    //unset($menu[70]);   // Removes "Users"
    unset($menu[75]);   // Removes "Tools"
    //unset($menu[80]);   // Removes "Settings"
    //unset($menu[80]);   // Removes "Settings"
    remove_menu_page('index.php'); // Removes the Dashboard home page
}
add_action('admin_menu', 'remove_dashboard_menu_items');

function plt_hide_elementor_menus() {
	//Hide "Elementor".
	//remove_menu_page('elementor');
	//Hide "Elementor → Settings".
	remove_submenu_page('elementor', 'elementor');
	//Hide "Elementor → Role Manager".
	remove_submenu_page('elementor', 'elementor-role-manager');
	//Hide "Elementor → Tools".
	remove_submenu_page('elementor', 'elementor-tools');
	//Hide "Elementor → System Info".
	remove_submenu_page('elementor', 'elementor-system-info');
	//Hide "Elementor → Getting Started".
	remove_submenu_page('elementor', 'elementor-getting-started');
	//Hide "Elementor → Get Help".
	remove_submenu_page('elementor', 'go_knowledge_base_site');
	//Hide "Elementor → Submissions".
	remove_submenu_page('elementor', 'e-form-submissions');
	//Hide "Elementor → Custom Fonts".
	remove_submenu_page('elementor', 'elementor_custom_fonts');
	//Hide "Elementor → Custom Icons".
	remove_submenu_page('elementor', 'elementor_custom_icons');
	//Hide "Elementor → Custom Code".
	remove_submenu_page('elementor', 'elementor_custom_custom_code');
	//Hide "Elementor → Upgrade".
	remove_submenu_page('elementor', 'go_elementor_pro');

	//Hide "Templates".
	//remove_menu_page('edit.php?post_type=elementor_library');
	//Hide "Templates → Saved Templates".
	//remove_submenu_page('edit.php?post_type=elementor_library', 'edit.php?post_type=elementor_library&tabs_group=library');
	//Hide "Templates → Theme Builder".
	remove_submenu_page('edit.php?post_type=elementor_library', 'http://127.0.0.1/wp-admin/admin.php?page=elementor-app&ver=3.13.2#site-editor/promotion');
	//Hide "Templates → Landing Pages".
	remove_submenu_page('edit.php?post_type=elementor_library', 'e-landing-page');
	//Hide "Templates → Kit Library".
	remove_submenu_page('edit.php?post_type=elementor_library', 'http://127.0.0.1/wp-admin/admin.php?page=elementor-app&ver=3.13.2#/kit-library');
	//Hide "Templates → Popups".
	remove_submenu_page('edit.php?post_type=elementor_library', 'popup_templates');
	//Hide "Templates → Add New".
	remove_submenu_page('edit.php?post_type=elementor_library', 'http://127.0.0.1/wp-admin/edit.php?post_type=elementor_library#add_new');
	//Hide "Templates → Categories".
	remove_submenu_page('edit.php?post_type=elementor_library', 'edit-tags.php?taxonomy=elementor_library_category&post_type=elementor_library');
}

add_action('admin_menu', 'plt_hide_elementor_menus', 201);

//Live chat telegram
add_filter('tcl_theme_list', function ($data) {
            $data[3] = [
                'name' => 'My theme',
                'url' => '/css/my-them.css',
            ];
            return $data;
        });

remove_action( 'woocommerce_archive_description', 'woocommerce_taxonomy_archive_description', 10 );
add_action( 'woocommerce_after_shop_loop', 'woocommerce_taxonomy_archive_description', 100 );

/**
*Sidebar Woo 
*/
add_filter( 'astra_woocommerce_shop_sidebar_init', 'widget_title_tag', 10, 1 );
 
function widget_title_tag( $atts ) {
    $atts['before_title'] = '<h4 class="widget-title">';
    $atts['after_title'] = '</h4>';
 
    return $atts;
}

remove_action( 'woocommerce_shop_loop_item_title','woocommerce_template_loop_product_title', 10 );
add_action('woocommerce_shop_loop_item_title', 'astra_woo_shop_products_title', 10 );
function astra_woo_shop_products_title() {
    echo '<h3 class="' . esc_attr( apply_filters( 'woocommerce_product_loop_title_classes', 'woocommerce-loop-product__title' ) ) . '">' . get_the_title() . '</h3>';
}

remove_action( 'woocommerce_shop_loop_subcategory_title', 'woocommerce_template_loop_category_title', 10, 2 ); 
add_action( 'woocommerce_shop_loop_subcategory_title', 'woocommerce_template_loop_category_title_over', 10 );
function woocommerce_template_loop_category_title_over( $category ) {
	?>
	<h3 class="woocommerce-loop-category__title">
			<?php
			echo esc_html( $category->name );

			if ( $category->count > 0 ) {
			
				echo apply_filters( 'woocommerce_subcategory_count_html', ' (' . esc_html( $category->count ) . ')', $category );
			}
			?>
		</h3>
	<?php
}

/**
 * Cart update
 * */
function mp_autom_cart_update_after_changes_the_goods_quantity() {
    // Перевірка, якщо сторінка є Кошиком
    if ( ! is_cart() ) {
        return;
    }
    ?>
    <script>
        jQuery(function($) {
            var delay;
            // Вішаємо "слухача".
            $('.woocommerce').on('change', 'input.qty', function() {
                if (undefined !== delay) {
                    clearTimeout(delay);
                }
                // Затримка у півсекунди, щоб не генерувати лишні запити на сервер
                delay = setTimeout(
                    function() {
                        // Клікаємо на кпоку оновлення Кошика
                        $('[name="update_cart"]').trigger('click');
                    }, 500
                );
            });
        });
    </script>
    <style>
        /* Ховаємо кнопку */
        .woocommerce[name="update_cart"] {display: none;}
    </style>
    <?php
}
add_action( 'wp_footer', 'mp_autom_cart_update_after_changes_the_goods_quantity' );


 function apply_quantity_based_discount() {
    global $product;

    if ( is_product() ) {
        // Отримуємо кількість товару з форми
        $quantity = isset( $_POST['quantity'] ) ? intval( $_POST['quantity'] ) : 1;

        // Перевіряємо кількість та застосовуємо знижку
        if ( $quantity >= 30 ) {
            $discount_percentage = 30;
        } elseif ( $quantity >= 20 ) {
            $discount_percentage = 20;
        } elseif ( $quantity >= 10 ) {
            $discount_percentage = 10;
        } else {
            $discount_percentage = 0; // Немає знижки
        }

        // Застосовуємо знижку
        if ( $discount_percentage > 0 ) {
            $original_price = wc_get_price_excluding_tax( $product );
            $discounted_price = $original_price * ( 1 - $discount_percentage / 100 );

            // Виводимо повідомлення про знижку та нову ціну
            echo '<div class="quantity-discount-message">';
            echo sprintf( __( 'Знижка %d%% застосована. Нова ціна: %s', 'your-theme-text-domain' ), $discount_percentage, wc_price( $discounted_price ) );
            echo '</div>';

            // Оновлюємо ціну товару
            add_filter( 'woocommerce_get_price', function( $price ) use ( $discounted_price ) {
                return $discounted_price;
            } );
        }
    }
}

add_action( 'woocommerce_before_add_to_cart_form', 'apply_quantity_based_discount' );

function custom_template_single_price() {
    global $product;
    if ($product->is_type('variable')) {
        // Отримуємо всі варіації
        $variations = $product->get_available_variations();
        
        // Додаємо ціни до опцій варіацій
        ?>
        <script type="text/javascript">
        jQuery(document).ready(function($) {
            <?php foreach ($variations as $variation) : ?>
                $('select[name="attribute_pa_forma-prodazhi"] option[value="<?php echo esc_js($variation['attributes']['attribute_pa_forma-prodazhi']); ?>"]')
                    .data('price', <?php echo esc_js($variation['display_price']); ?>);
            <?php endforeach; ?>
        });
        </script>
        <?php
        ?>
        <style>
        /* Приховуємо стандартні елементи */
        .woocommerce div.product form.cart .reset_variations,
        .woocommerce div.product form.cart .variations select,
        .woocommerce div.product form.cart .variations td.label,
        .woocommerce-variation-price,
        .woocommerce-variation-availability,
        .woocommerce-variation-description,
        .woocommerce div.product p.price,
        .woocommerce div.product span.price {
            display: none !important;
        }

        /* Стилі для кнопок варіацій */
        .woocommerce div.product form.cart .variations {
            margin-bottom: 15px;
            width: auto;
        }

        .woocommerce div.product form.cart .variations tbody {
            display: flex;
        }

        .woocommerce div.product form.cart .variations tr {
            display: flex;
            width: 100%;
        }

        .woocommerce div.product form.cart .variations td.value {
            padding: 0;
            display: flex;
            gap: 8px;
            width: 100%;
        }

        .woocommerce div.product form.cart .variations .button-value {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 24px;
            margin: 0 8px 8px 0;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 16px;
            font-weight: 600;
            color: #666;
        }

        .woocommerce div.product form.cart .variations .button-value:hover {
            border-color: #4CAF50;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(76, 175, 80, 0.15);
            color: #4CAF50;
        }

        .woocommerce div.product form.cart .variations .button-value.selected {
            background: #4CAF50;
            color: white;
            border-color: #4CAF50;
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
        }

        .woocommerce div.product form.cart .variations .button-value .icon {
            font-size: 20px;
            opacity: 0.9;
        }

        .woocommerce div.product form.cart .variations .button-value:hover .icon {
            opacity: 1;
            transform: scale(1.1);
            transition: all 0.3s ease;
        }

        .woocommerce div.product form.cart .variations .price {
            margin: 20px 0;
            font-size: 24px;
            font-weight: 700;
            color: #2196F3;
        }

        .woocommerce div.product form.cart .variations .price .amount {
            display: inline-block;
            margin-left: 5px;
        }

        /* Стилі для попапу */
        .popup {
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(3px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
        }

        .popup-content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 15px;
            width: 100%;
            max-width: 380px;
            position: relative;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            animation: popupSlideIn 0.4s ease-out;
            margin: auto;
            box-sizing: border-box;
            transform: translateY(10vh);
        }

        @keyframes popupSlideIn {
            0% {
                transform: translateY(calc(10vh - 20px)) scale(0.95);
                opacity: 0;
            }
            100% {
                transform: translateY(10vh) scale(1);
                opacity: 1;
            }
        }

        .popup-header {
            text-align: center;
            margin-bottom: 12px;
            position: relative;
        }

        .popup-title {
            font-size: 20px;
            color: #333;
            margin: 0 0 6px;
            font-weight: 600;
        }

        .popup-subtitle {
            font-size: 13px;
            color: #666;
            margin: 0;
            line-height: 1.3;
        }

        .close-popup {
            position: absolute;
            right: -15px;
            top: -15px;
            width: 32px;
            height: 32px;
            background: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            color: #666;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            border: 2px solid #eee;
            z-index: 1;
        }

        .close-popup:hover {
            color: #333;
            transform: rotate(90deg);
            border-color: #ddd;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .popup-benefits {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin: 15px 0;
        }

        .benefit-item {
            display: flex;
            align-items: center;
            padding: 8px;
            background: #f8f9fa;
            border-radius: 8px;
            transition: all 0.3s ease;
            min-height: 40px;
        }

        .benefit-icon {
            font-size: 20px;
            margin-right: 8px;
            animation: iconFloat 3s ease-in-out infinite;
            min-width: 24px;
            text-align: center;
        }

        .benefit-text {
            font-size: 13px;
            color: #444;
            line-height: 1.2;
        }

        @media (max-width: 544px) {
            .popup-content {
                padding: 15px;
                max-width: 340px;
            }

            .popup-benefits {
                grid-template-columns: 1fr;
                gap: 8px;
            }

            .popup-title {
                font-size: 18px;
            }

            .popup-subtitle {
                font-size: 12px;
            }

            .benefit-item {
                padding: 6px;
            }

            .benefit-icon {
                font-size: 18px;
                margin-right: 6px;
            }

            .benefit-text {
                font-size: 12px;
            }
        }

        .stars-container {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            top: 0;
            left: 0;
            z-index: -1;
        }

        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: #FFD700;
            opacity: 0.5;
            animation: starTwinkle 1s infinite;
        }

        @keyframes starTwinkle {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }

        @keyframes iconFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }

        .jet-form-builder__label-text {
            font-weight: 500;
            color: #333;
            margin-bottom: 5px;
        }

        .jet-form-builder__field {
            border: 2px solid #eee !important;
            border-radius: 8px !important;
            padding: 10px 15px !important;
            transition: all 0.3s ease !important;
        }

        .jet-form-builder__field:focus {
            border-color: #2196F3 !important;
            box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1) !important;
        }

        .jet-form-builder__submit {
            background: #2196F3 !important;
            color: white !important;
            border: none !important;
            border-radius: 8px !important;
            padding: 12px 25px !important;
            font-weight: 600 !important;
            transition: all 0.3s ease !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
        }

        .jet-form-builder__submit:hover {
            background: #1976D2 !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 8px rgba(33, 150, 243, 0.2) !important;
        }
        </style>

        <script type="text/javascript">
        jQuery(document).ready(function($) {
            // Очищаємо контейнер від стандартних елементів
            $('.variations td.value').empty();

            // Додаємо наші кнопки
            var buttons = [
                { value: 'кг', icon: '⚖️' },
                { value: 'тн', icon: '🚛' },
                { value: 'опт', icon: '👥' }
            ];

            buttons.forEach(function(btn) {
                var button = $('<button>', {
                    type: 'button',
                    class: 'button-value',
                    'data-value': btn.value,
                    html: `<span class="icon">${btn.icon}</span>${btn.value}`
                });
                
                $('.variations td.value').append(button);
            });

            // Функція для оновлення відображення цін
            function updatePrices(variation, selectedValue) {
                let priceHtml = '';
                
                if (selectedValue === 'кг') {
                    priceHtml = `
                        <div class="price-display" data-type="kg">
                            <div class="price-amount">
                                <span class="price-value">22.0</span>
                                <span class="currency">₴</span>
                            </div>
                            <div class="price-label">за кілограм</div>
                        </div>
                    `;
                } else if (selectedValue === 'тн') {
                    priceHtml = `
                        <div class="price-display" data-type="tn">
                            <div class="price-amount">
                                <span class="price-value">19.0</span>
                                <span class="currency">₴</span>
                            </div>
                            <div class="price-label">за тонну</div>
                        </div>
                    `;
                }

                // Вставляємо ціни на сторінку після варіацій
                $('.price-range-container').remove();
                if (priceHtml) {
                    $('.variations_form').find('.variations').after(`
                        <div class="price-range-container">
                            ${priceHtml}
                        </div>
                    `);
                    // Додаємо анімацію появи
                    $('.price-range-container').hide().fadeIn(300);
                }
            }

            // Обробник кліків по кнопках
            $('.variations').on('click', '.button-value', function(e) {
                e.preventDefault();
                var value = $(this).data('value');
                
                $('.button-value').removeClass('selected');
                $(this).addClass('selected');

                if (value === 'опт') {
                    $('.price-range-container').fadeOut(300, function() {
                        $(this).remove();
                        // Оновлюємо HTML попапу при кліку на кнопку "опт"
                        if ($('#consultation-popup .popup-header').length === 0) {
                            const popupContent = $('#consultation-popup .popup-content');
                            const form = popupContent.find('form');
                            
                            // Додаємо новий контент перед формою
                            form.before(`
                                <div class="popup-header">
                                    <h3 class="popup-title">🌟 Оптові замовлення 🌟</h3>
                                    <p class="popup-subtitle">Отримайте спеціальні умови для оптових закупівель</p>
                                </div>
                                <div class="popup-benefits">
                                    <div class="benefit-item">
                                        <span class="benefit-icon">💰</span>
                                        <span class="benefit-text">Спеціальні ціни</span>
                                    </div>
                                    <div class="benefit-item">
                                        <span class="benefit-icon">🚚</span>
                                        <span class="benefit-text">Швидка доставка</span>
                                    </div>
                                    <div class="benefit-item">
                                        <span class="benefit-icon">📦</span>
                                        <span class="benefit-text">Великий вибір</span>
                                    </div>
                                    <div class="benefit-item">
                                        <span class="benefit-icon">🤝</span>
                                        <span class="benefit-text">Персональний підхід</span>
                                    </div>
                                </div>
                            `);
                            
                            // Додаємо зірки
                            popupContent.append(createStars());
                        }
                        $('#consultation-popup').fadeIn(400);
                    });
                } else {
                    $('#consultation-popup').fadeOut();
                    $('select[name="attribute_pa_forma-prodazhi"]').val(value).trigger('change');
                    updatePrices(null, value);
                }
            });

            // Функція для створення зірок
            function createStars() {
                const starsContainer = $('<div class="stars-container"></div>');
                for (let i = 0; i < 20; i++) {
                    const star = $('<div class="star"></div>');
                    star.css({
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        animationDelay: Math.random() * 2 + 's'
                    });
                    starsContainer.append(star);
                }
                return starsContainer;
            }

            // Активуємо першу кнопку за замовчуванням
            setTimeout(function() {
                $('.button-value[data-value="кг"]').trigger('click');
            }, 100);

            // Закриття попапу
            $('.close-popup, .popup').on('click', function(e) {
                if (e.target === this) {
                    $('#consultation-popup').fadeOut();
                    $('.button-value').removeClass('selected');
                    $('.button-value[data-value="кг"]').addClass('selected').trigger('click');
                }
            });
        });
        </script>

        <style>
        /* Приховуємо стандартні елементи */
        .woocommerce div.product form.cart .reset_variations,
        .woocommerce div.product form.cart .variations select,
        .woocommerce div.product form.cart .variations td.label,
        .woocommerce-variation-price,
        .woocommerce-variation-availability,
        .woocommerce-variation-description,
        .woocommerce div.product p.price,
        .woocommerce div.product span.price {
            display: none !important;
        }

        /* Стилі для відображення цін */
        .price-display {
            text-align: center;
            padding: 15px;
            margin: 15px 0;
            background: #f8f9fa;
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        .price-amount {
            font-size: 32px;
            font-weight: 700;
            color: #4CAF50;
            margin-bottom: 5px;
        }

        .price-value {
            margin-right: 5px;
        }

        .currency {
            font-weight: 500;
        }

        .price-label {
            font-size: 14px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Стилі для кнопок */
        .button-value {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 24px;
            margin: 0 8px 8px 0;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 16px;
            font-weight: 600;
            color: #666;
        }

        .button-value:hover {
            border-color: #4CAF50;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(76, 175, 80, 0.15);
            color: #4CAF50;
        }

        .button-value.selected {
            background: #4CAF50;
            color: white;
            border-color: #4CAF50;
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
        }

        .button-value .icon {
            font-size: 20px;
            opacity: 0.9;
        }

        .button-value:hover .icon {
            opacity: 1;
            transform: scale(1.1);
            transition: all 0.3s ease;
        }

        /* Анімація для цін */
        @keyframes priceAppear {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .price-display {
            animation: priceAppear 0.3s ease-out;
        }
        </style>

        <?php if (!isset($_POST['product_id'])) : ?>
        <!-- Попап для оптових замовлень -->
        <div id="consultation-popup" class="popup">
            <div class="popup-content">
                <span class="close-popup">&times;</span>
                <?php
                $product_name = $product->get_name();
                $product_url = get_permalink($product->get_id());
                $product_id = $product->get_id();
                
                echo do_shortcode('[jet_fb_form form_id="5779" product_name="' . $product_name . '" product_url="' . $product_url . '" product_id="' . $product_id . '" submit_type="reload" required_mark="*" fields_layout="column" fields_label_tag="div" enable_progress="0" clear="0"]');
                ?>
            </div>
        </div>
        <?php endif; ?>
        <?php
    }
}

// Видаляємо стандартне відображення ціни та варіацій
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 10);
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30);
add_action('woocommerce_single_product_summary', 'custom_template_single_price', 10);

// Додаємо емодзі замість Font Awesome
function add_emoji_support() {
    if (!is_admin()) {
        echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
    }
}
add_action('wp_head', 'add_emoji_support', 5);

function add_custom_product_styles() {
    ?>
    <style>
    .woocommerce-product-details__short-description p {
        margin-bottom: 0.2em;
    }
    </style>
    <?php
}
add_action('wp_head', 'add_custom_product_styles');