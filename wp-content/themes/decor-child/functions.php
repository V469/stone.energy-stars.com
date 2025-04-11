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
            padding: 12px 24px;
            margin: 0 8px 8px 0;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 16px;
            font-weight: 600;
            color: #666;
            flex: 1;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        .woocommerce div.product form.cart .variations .button-value::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05));
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .woocommerce div.product form.cart .variations .button-value:hover {
            border-color: #4CAF50;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(76, 175, 80, 0.15);
            color: #4CAF50;
        }

        .woocommerce div.product form.cart .variations .button-value:hover::before {
            opacity: 1;
        }

        .woocommerce div.product form.cart .variations .button-value.selected {
            background: #4CAF50;
            color: white;
            border-color: #4CAF50;
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
        }

        .woocommerce div.product form.cart .variations .button-value.selected::before {
            opacity: 0;
        }

        .woocommerce div.product form.cart .variations .button-value .icon {
            font-size: 20px;
            opacity: 0.9;
            transition: all 0.3s ease;
        }

        .woocommerce div.product form.cart .variations .button-value:hover .icon {
            opacity: 1;
            transform: scale(1.1) rotate(5deg);
        }

        /* Стилі для відображення цін */
        .price-display {
            text-align: center;
            padding: 15px;
            margin: 15px 0;
            background: #f8f9fa;
            border-radius: 12px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .price-display::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05));
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .price-display:hover::before {
            opacity: 1;
        }

        .price-amount {
            font-size: 32px;
            font-weight: 700;
            color: #4CAF50;
            margin-bottom: 5px;
            position: relative;
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

        /* Стилі для попапу */
        .popup {
            display: none !important;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(3px);
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .popup.active {
            display: flex !important;
            opacity: 1;
            visibility: visible;
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

        /* Стилі для кількості товару */
        .quantity-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 15px 0;
            gap: 10px;
        }

        .quantity-input {
            width: 60px;
            text-align: center;
            padding: 8px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            color: #333;
            transition: all 0.3s ease;
        }

        .quantity-input:focus {
            border-color: #4CAF50;
            box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
            outline: none;
        }

        .quantity-button {
            width: 32px;
            height: 32px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            background: white;
            color: #666;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .quantity-button:hover {
            border-color: #4CAF50;
            color: #4CAF50;
            transform: scale(1.1);
        }
        </style>

        <script type="text/javascript">
        jQuery(document).ready(function($) {
            // Приховуємо попап при завантаженні
            const popup = $('#consultation-popup');
            popup.removeClass('active');
            
            // Додаємо стилі для попапу одразу
            $('head').append(`
                <style>
                    #consultation-popup {
                        display: none !important;
                        opacity: 0;
                        visibility: hidden;
                    }
                    #consultation-popup.active {
                        display: flex !important;
                        opacity: 1;
                        visibility: visible;
                    }
                </style>
            `);

            // Очищаємо контейнер від стандартних елементів
            $('.variations td.value').empty();

            // Додаємо наші кнопки
            var buttons = [
                { value: 'кг', icon: '⚖️', description: 'Роздрібна ціна за кілограм', defaultQty: 25 },
                { value: 'тн', icon: '🚛', description: 'Оптова ціна за тонну', defaultQty: 1000 },
                { value: 'опт', icon: '👥', description: 'Спеціальні умови для оптових замовлень' }
            ];

            buttons.forEach(function(btn) {
                var button = $('<button>', {
                    type: 'button',
                    class: 'button-value',
                    'data-value': btn.value,
                    'data-description': btn.description,
                    'data-default-qty': btn.defaultQty,
                    html: `<span class="icon">${btn.icon}</span>${btn.value}`
                });
                
                $('.variations td.value').append(button);
            });

            // Обробник кліку по кнопці
            $('.variations').on('click', '.button-value', function(e) {
                e.preventDefault();
                $('.button-value').removeClass('selected');
                $(this).addClass('selected');
                
                var selectedValue = $(this).data('value');
                var description = $(this).data('description');
                var defaultQty = $(this).data('default-qty');
                
                if (selectedValue === 'опт') {
                    popup.addClass('active');
                    $('.single_add_to_cart_button').prop('disabled', true);
                } else {
                    popup.removeClass('active');
                    var $select = $('select[name="attribute_pa_forma-prodazhi"]');
                    $select.val(selectedValue);
                    $select.trigger('change');
                    
                    if (defaultQty) {
                        $('input.qty').val(defaultQty).trigger('change');
                    }
                    
                    $('.single_add_to_cart_button')
                        .prop('disabled', false)
                        .removeClass('wc-variation-selection-needed')
                        .removeClass('disabled')
                        .addClass('active');
                    
                    updatePrices(selectedValue, description);
                }
            });

            // Закриття попапу
            $('.close-popup, .popup').on('click', function(e) {
                if (e.target === this) {
                    popup.removeClass('active');
                    $('.button-value[data-value="кг"]').trigger('click');
                }
            });

            // Активуємо кг за замовчуванням при завантаженні БЕЗ показу попапу
            setTimeout(function() {
                var $kgButton = $('.button-value[data-value="кг"]');
                $kgButton.addClass('selected');
                
                var $select = $('select[name="attribute_pa_forma-prodazhi"]');
                $select.val('кг');
                $select.trigger('change');
                
                $('input.qty').val(25).trigger('change');
                
                $('.single_add_to_cart_button')
                    .prop('disabled', false)
                    .removeClass('wc-variation-selection-needed')
                    .removeClass('disabled')
                    .addClass('active');
                
                updatePrices('кг', $kgButton.data('description'));
            }, 500);

            // Функція для оновлення відображення цін
            function updatePrices(selectedValue, description) {
                let priceHtml = '';
                let priceValue = selectedValue === 'кг' ? '22.0' : '19000.0';
                let unit = selectedValue === 'кг' ? 'кг' : 'тн';
                
                priceHtml = `
                    <div class="price-display" data-type="${selectedValue}">
                        <div class="price-amount">
                            <span class="price-value">${priceValue}</span>
                            <span class="currency">₴/${unit}</span>
                        </div>
                        <div class="price-label">${description}</div>
                    </div>
                `;

                $('.price-range-container').remove();
                if (priceHtml) {
                    $('.variations_form').find('.variations').after(`
                        <div class="price-range-container">
                            ${priceHtml}
                        </div>
                    `);
                    $('.price-range-container').hide().fadeIn(300);
                }
            }

            // Обробник зміни кількості
            $('input.qty').on('change', function() {
                var selectedValue = $('.button-value.selected').data('value');
                if (selectedValue === 'тн') {
                    // Переконуємося, що кількість кратна 1000 для тонн
                    var qty = parseInt($(this).val());
                    if (qty < 1000) {
                        $(this).val(1000);
                    } else {
                        $(this).val(Math.round(qty / 1000) * 1000);
                    }
                }
            });
        });
        </script>

        <?php if (!isset($_POST['product_id'])) : ?>
        <!-- Попап для оптових замовлень -->
        <div id="consultation-popup" class="popup">
            <div class="popup-content">
                <span class="close-popup">&times;</span>
                <div class="popup-header">
                    <h3 class="popup-title">Оптове замовлення</h3>
                    <p class="popup-subtitle">Залиште свої контакти, і наш менеджер зв'яжеться з вами для обговорення умов співпраці</p>
                </div>
                <div class="popup-benefits">
                    <div class="benefit-item">
                        <span class="benefit-icon">💰</span>
                        <span class="benefit-text">Спеціальні ціни для оптових покупців</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">🚚</span>
                        <span class="benefit-text">Безкоштовна доставка від певної суми</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">📦</span>
                        <span class="benefit-text">Індивідуальна упаковка</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">🤝</span>
                        <span class="benefit-text">Персональний менеджер</span>
                    </div>
                </div>
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

// Видаляємо стандартне відображення ціни
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 10);
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