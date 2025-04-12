jQuery(document).ready(function ($) {
    // Додаємо ціновий діапазон під заголовок при завантаженні
    var $title = $('.entry-summary h1');
    if ($title.length && !$('.product-price-range').length) {
        $title.after('<div class="product-price-range">22.0 ₴ – 24.0 ₴</div>');
    }

    // Додаємо ціну під кнопками
    var $buttons = $('.custom-variation-buttons');
    if ($buttons.length && !$('.price-range[data-unit="kg"]').length) {
        $buttons.after('<div class="price-range" data-unit="kg">24.0 ₴</div>');
    }

    // Стилізуємо ціновий діапазон при завантаженні
    function stylePriceRange() {
        const $priceRange = $('.product-price-range');
        if ($priceRange.length) {
            $priceRange.css({
                'display': 'block',
                'font-size': '28px',
                'color': '#4CAF50',
                'font-weight': '600',
                'margin': '10px 0'
            });

            $priceRange.find('span, bdi, .woocommerce-Price-amount, .woocommerce-Price-currencySymbol').css({
                'color': '#4CAF50',
                'font-weight': '600'
            });
        }
    }

    // Викликаємо функцію стилізації при завантаженні
    stylePriceRange();

    // Стилізуємо селектор кількості та кнопку замовлення
    function styleQuantityAndButton() {
        const buttonHeight = '48px';
        const $quantity = $('.quantity');
        const $input = $quantity.find('input[type="number"]');
        const variationWidth = $('.custom-variation-buttons').width();

        // Оновлюємо контейнер для горизонтального вирівнювання
        const $container = $('<div/>', {
            class: 'order-container',
            css: {
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'space-between',
                'margin-top': '15px',
                'width': variationWidth,
                'gap': '10px',
                'height': buttonHeight // Фіксована висота контейнера
            }
        });

        // Оновлюємо стилі для кнопки замовлення
        const $orderButton = $('button.single_add_to_cart_button').css({
            'height': buttonHeight,
            'width': '33.33%',
            'border': '2px solid #4CAF50',
            'border-radius': '8px',
            'background': '#4CAF50',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'font-size': '16px',
            'font-weight': '600',
            'color': 'white',
            'transition': 'all 0.2s ease-in-out',
            'box-shadow': '0 2px 4px rgba(76, 175, 80, 0.2)',
            'line-height': '1',
            'padding': '0',
            'margin': '0',
            'margin-bottom': '0'
        }).hover(
            function () {
                $(this).css({
                    'background': '#45a049',
                    'border-color': '#45a049',
                    'box-shadow': '0 4px 8px rgba(76, 175, 80, 0.25)',
                    'transform': 'none' // Прибираємо зміщення при наведенні
                });
            },
            function () {
                $(this).css({
                    'background': '#4CAF50',
                    'border-color': '#4CAF50',
                    'box-shadow': '0 2px 4px rgba(76, 175, 80, 0.2)',
                    'transform': 'none' // Прибираємо зміщення при виході
                });
            }
        );

        // Оновлюємо стилі для контейнера кількості
        const $quantityContainer = $('<div/>', {
            class: 'quantity-container',
            css: {
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'width': '33.33%',
                'background': 'white',
                'border': '2px solid #E8E8E8',
                'border-radius': '8px',
                'height': buttonHeight,
                'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.05)',
                'transition': 'all 0.2s ease-in-out',
                'overflow': 'hidden'
            }
        });

        // Оновлюємо висоту для всіх кнопок та значення
        const buttonStyles = {
            'height': buttonHeight,
            'width': '42px'
        };

        // Створюємо кнопку мінус
        const $minusButton = $('<button/>', {
            type: 'button',
            html: '<svg width="14" height="2" viewBox="0 0 14 2" fill="none"><rect width="14" height="2" rx="1" fill="currentColor"/></svg>',
            class: 'qty-button minus',
            css: {
                ...buttonStyles,
                'cursor': 'pointer',
                'background': 'none',
                'border': 'none',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'color': '#444',
                'transition': 'all 0.2s ease-in-out',
                'padding': '0'
            }
        });

        // Створюємо елемент для значення
        const $valueDisplay = $('<div/>', {
            text: '2',
            class: 'qty-value',
            css: {
                'height': buttonHeight,
                'font-weight': '600',
                'color': '#4CAF50',
                'min-width': '80px',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'font-size': '16px',
                'padding': '0 15px',
                'white-space': 'nowrap',
                'font-feature-settings': '"tnum" on, "lnum" on',
                'font-variant-numeric': 'tabular-nums',
                'background': 'white',
                'border-left': '2px solid #E8E8E8',
                'border-right': '2px solid #E8E8E8'
            }
        });

        // Створюємо кнопку плюс
        const $plusButton = $('<button/>', {
            type: 'button',
            html: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect y="6" width="14" height="2" rx="1" fill="currentColor"/><rect x="6" y="14" width="14" height="2" rx="1" transform="rotate(-90 6 14)" fill="currentColor"/></svg>',
            class: 'qty-button plus',
            css: {
                ...buttonStyles,
                'cursor': 'pointer',
                'background': 'none',
                'border': 'none',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'color': '#444',
                'transition': 'all 0.2s ease-in-out',
                'padding': '0'
            }
        });

        // Додаємо hover ефекти для кнопок
        $('.qty-button').hover(
            function () {
                $(this).css({
                    'color': '#4CAF50',
                    'background': 'rgba(76, 175, 80, 0.05)'
                });
            },
            function () {
                $(this).css({
                    'color': '#444',
                    'background': 'none'
                });
            }
        );

        // Додаємо hover ефект для контейнера кількості
        $quantityContainer.hover(
            function () {
                $(this).css({
                    'border-color': '#4CAF50',
                    'box-shadow': '0 4px 8px rgba(76, 175, 80, 0.15)'
                });
            },
            function () {
                $(this).css({
                    'border-color': '#E8E8E8',
                    'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.05)'
                });
            }
        );

        // Приховуємо оригінальне поле введення
        $input.hide();

        // Збираємо всі елементи
        $quantityContainer.append($minusButton, $valueDisplay, $plusButton);
        $container.append($quantityContainer);

        // Очищаємо та додаємо нові елементи
        $quantity.empty().append($container);

        // Переміщуємо кнопку замовлення в контейнер
        $orderButton.appendTo($container);

        // Оновлюємо значення при зміні варіації
        function updateValue() {
            const $activeButton = $('.variation-button.active');
            if ($activeButton.length) {
                const variation = $activeButton.data('variation');
                if (variation && VARIATIONS[variation]) {
                    const value = VARIATIONS[variation].quantity;
                    $input.val(value);
                    $valueDisplay.text(value);

                    // Адаптуємо ширину для великих чисел
                    const valueLength = value.toString().length;
                    if (valueLength > 3) {
                        $valueDisplay.css({
                            'min-width': '100px',
                            'font-size': '15px'
                        });
                    } else {
                        $valueDisplay.css({
                            'min-width': '80px',
                            'font-size': '16px'
                        });
                    }
                    updateButtonPrice(variation);
                }
            }
        }

        // Додаємо обробники для кнопок
        $minusButton.on('click', function () {
            const currentVal = parseInt($input.val());
            const step = parseInt($input.attr('step')) || 1;
            const min = parseInt($input.attr('min')) || 1;
            if (currentVal > min) {
                const newVal = currentVal - step;
                $input.val(newVal).trigger('change');
                $valueDisplay.text(newVal);
            }
        });

        $plusButton.on('click', function () {
            const currentVal = parseInt($input.val());
            const step = parseInt($input.attr('step')) || 1;
            const newVal = currentVal + step;
            $input.val(newVal).trigger('change');
            $valueDisplay.text(newVal);
        });

        // Встановлюємо початкове значення
        updateValue();
    }

    // Викликаємо функцію стилізації після завантаження сторінки
    styleQuantityAndButton();

    // Константи для варіацій
    const VARIATIONS = {
        kg: {
            price: 24.0,
            quantity: 25,
            unit: 'кг'
        },
        tn: {
            price: 22000.0,
            quantity: 1000,
            unit: 'кг'
        }
    };

    // Кешуємо DOM елементи
    const $quantityInput = $('input.qty');
    const $variationButtons = $('.variation-button');
    const $priceRange = $('.product-price-range');
    const $wholesalePopup = $('#wholesale-popup');
    const $wholesaleForm = $('.wholesale-form');

    // Функція форматування ціни
    function formatPrice(price) {
        return price.toFixed(1) + ' ₴';
    }

    // Функція оновлення ціни під кнопкою
    function updateButtonPrice(variation) {
        $('.price-range').remove();
        if (variation === 'opt') return;

        const price = VARIATIONS[variation].price;
        const unit = VARIATIONS[variation].unit;

        const $priceBlock = $('<div/>', {
            class: 'price-range',
            'data-unit': variation,
            css: {
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'height': '48px',
                'width': '33.33%',
                'background': 'rgba(76, 175, 80, 0.04)',
                'border': '2px solid rgba(76, 175, 80, 0.15)',
                'border-radius': '8px',
                'padding': '0',
                'box-shadow': '0 2px 4px rgba(76, 175, 80, 0.1)',
                'transition': 'all 0.2s ease-in-out',
                'line-height': '1' // Фіксуємо висоту лінії
            }
        }).append(
            $('<div/>', {
                css: {
                    'display': 'flex',
                    'align-items': 'center',
                    'justify-content': 'center', // Додаємо центрування
                    'gap': '4px',
                    'height': '100%' // Розтягуємо на всю висоту
                }
            }).append(
                $('<span/>', {
                    text: formatPrice(price),
                    css: {
                        'font-size': '16px',
                        'color': '#4CAF50',
                        'font-weight': '600',
                        'letter-spacing': '0.5px',
                        'text-transform': 'uppercase'
                    }
                }),
                $('<span/>', {
                    text: '/' + unit,
                    css: {
                        'font-size': '14px',
                        'color': 'rgba(76, 175, 80, 0.8)',
                        'font-weight': '500',
                        'letter-spacing': '0.5px',
                        'text-transform': 'uppercase'
                    }
                })
            )
        );

        // Додаємо hover ефект для блоку ціни
        $priceBlock.hover(
            function () {
                $(this).css({
                    'background': 'rgba(76, 175, 80, 0.08)',
                    'border-color': '#4CAF50',
                    'box-shadow': '0 4px 8px rgba(76, 175, 80, 0.15)',
                    'transform': 'translateY(-1px)'
                });
            },
            function () {
                $(this).css({
                    'background': 'rgba(76, 175, 80, 0.04)',
                    'border-color': 'rgba(76, 175, 80, 0.15)',
                    'box-shadow': '0 2px 4px rgba(76, 175, 80, 0.1)',
                    'transform': 'translateY(0)'
                });
            }
        );

        // Вставляємо ціну в контейнер перед селектором кількості
        $('.quantity-container').before($priceBlock);
    }

    // Функція оновлення діапазону цін
    function updatePriceRange() {
        const minPrice = Math.min(VARIATIONS.kg.price, VARIATIONS.tn.price);
        const maxPrice = Math.max(VARIATIONS.kg.price, VARIATIONS.tn.price);
        $priceRange.html(formatPrice(minPrice) + ' – ' + formatPrice(maxPrice));
        stylePriceRange();
    }

    // Функція оновлення кількості
    function updateQuantity(variation) {
        if (variation === 'opt') return;

        const quantity = VARIATIONS[variation].quantity;
        $quantityInput.val(quantity);
        $quantityInput.attr('min', quantity);
        $quantityInput.attr('step', quantity);
    }

    // Функція оновлення варіації WooCommerce
    function updateWooVariation(variation) {
        const $form = $('form.variations_form');
        const $select = $form.find('select[name^="attribute_"]').first();

        if ($select.length) {
            $select.val(variation).trigger('change');
            $form.trigger('check_variations');
        }
    }

    // Стилізуємо кнопки варіацій при завантаженні
    function styleVariationButtons() {
        const buttonHeight = '48px'; // Базова висота для всіх елементів
        const commonButtonStyles = {
            'height': buttonHeight,
            'border': '2px solid #E8E8E8',
            'border-radius': '8px',
            'background': 'white',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'font-size': '16px',
            'font-weight': '500',
            'color': '#444',
            'transition': 'all 0.2s ease-in-out',
            'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.05)',
            'cursor': 'pointer',
            'padding': '0 20px',
            'text-transform': 'uppercase',
            'letter-spacing': '0.5px'
        };

        // Оновлюємо стилі для кнопки замовлення
        const $orderButton = $('button.single_add_to_cart_button').css({
            ...commonButtonStyles,
            'height': buttonHeight,
            'width': '33.33%',
            'border': '2px solid #4CAF50',
            'background': '#4CAF50',
            'color': 'white',
            'font-weight': '600',
            'box-shadow': '0 2px 4px rgba(76, 175, 80, 0.2)'
        });

        // Оновлюємо стилі для контейнера кількості
        const $quantityContainer = $('.quantity-container').css({
            'height': buttonHeight,
            'width': '33.33%'
        });

        // Оновлюємо стилі для кнопок +/- та значення
        $('.qty-button, .qty-value').css({
            'height': buttonHeight
        });

        // Оновлюємо стилі для блоку ціни
        $('.price-range').css({
            'height': buttonHeight
        });

        // Застосовуємо стилі до кнопок варіацій
        $('.variation-button').css(commonButtonStyles).hover(
            function () {
                $(this).css({
                    'background': '#4CAF50',
                    'border-color': '#4CAF50',
                    'color': 'white',
                    'box-shadow': '0 4px 8px rgba(76, 175, 80, 0.2)',
                    'transform': 'translateY(-1px)'
                });
            },
            function () {
                if (!$(this).hasClass('active')) {
                    $(this).css({
                        'background': 'white',
                        'border-color': '#E8E8E8',
                        'color': '#444',
                        'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.05)',
                        'transform': 'translateY(0)'
                    });
                }
            }
        );

        // Стилі для активної кнопки
        $('.variation-button.active').css({
            'background': '#4CAF50',
            'border-color': '#4CAF50',
            'color': 'white',
            'box-shadow': '0 4px 8px rgba(76, 175, 80, 0.2)'
        });
    }

    // Оновлюємо обробник кліку по кнопках варіацій
    $variationButtons.on('click', function () {
        const $button = $(this);
        const variation = $button.data('variation');

        // Видаляємо активний клас і стилі з усіх кнопок
        $variationButtons.removeClass('active').css({
            'background': 'white',
            'border-color': '#E8E8E8',
            'color': '#444',
            'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.05)',
            'transform': 'translateY(0)'
        });

        // Додаємо активний клас і стилі поточній кнопці
        $button.addClass('active').css({
            'background': '#4CAF50',
            'border-color': '#4CAF50',
            'color': 'white',
            'box-shadow': '0 4px 8px rgba(76, 175, 80, 0.2)'
        });

        if (variation === 'opt') {
            $wholesalePopup.addClass('active');
            $('.price-range').remove();
            return;
        }

        updateQuantity(variation);
        updateButtonPrice(variation);
        updateWooVariation(variation);
    });

    // Викликаємо функцію стилізації кнопок після завантаження сторінки
    styleVariationButtons();

    // Закриття попапу
    $('.close-popup, .wholesale-popup').on('click', function (e) {
        if (e.target === this) {
            $wholesalePopup.removeClass('active');
            $variationButtons.removeClass('active');
            $('.variation-price').remove();
        }
    });

    // Запобігаємо закриттю попапу при кліку на його вміст
    $('.wholesale-popup-content').on('click', function (e) {
        e.stopPropagation();
    });

    // Обробка форми оптового замовлення
    $wholesaleForm.on('submit', function (e) {
        e.preventDefault();

        const formData = {
            name: $(this).find('input[name="name"]').val(),
            phone: $(this).find('input[name="phone"]').val(),
            email: $(this).find('input[name="email"]').val(),
            message: $(this).find('textarea[name="message"]').val()
        };

        // TODO: Додати відправку даних на сервер
        console.log('Wholesale order:', formData);

        // Очищаємо форму і закриваємо попап
        this.reset();
        $wholesalePopup.removeClass('active');
        $variationButtons.removeClass('active');
        $('.variation-price').remove();

        // Показуємо повідомлення про успіх
        alert('Дякуємо за заявку! Наш менеджер зв\'яжеться з вами найближчим часом.');
    });

    // Валідація кількості при зміні
    $quantityInput.on('change', function () {
        const $activeButton = $('.variation-button.active');
        if (!$activeButton.length) return;

        const variation = $activeButton.data('variation');
        if (variation === 'opt') return;

        const minQuantity = VARIATIONS[variation].quantity;
        const currentValue = parseInt($(this).val());

        if (currentValue < minQuantity) {
            $(this).val(minQuantity);
        }
    });

    // Показуємо діапазон цін при завантаженні
    updatePriceRange();

    // Активуємо першу варіацію при завантаженні
    $variationButtons.first().trigger('click');

    // Оновлюємо стилі для попапу оптового замовлення
    const popupStyles = {
        '.wholesale-popup': {
            'background': 'rgba(0, 0, 0, 0.5)',
            'backdrop-filter': 'blur(4px)'
        },
        '.wholesale-popup-content': {
            'background': 'white',
            'border-radius': '12px',
            'box-shadow': '0 8px 16px rgba(0, 0, 0, 0.1)',
            'padding': '30px'
        },
        '.wholesale-form input, .wholesale-form textarea': {
            'border': '2px solid #E8E8E8',
            'border-radius': '8px',
            'height': '42px',
            'padding': '0 15px',
            'font-size': '16px',
            'transition': 'all 0.2s ease-in-out'
        },
        '.wholesale-form input:focus, .wholesale-form textarea:focus': {
            'border-color': '#4CAF50',
            'box-shadow': '0 2px 4px rgba(76, 175, 80, 0.1)',
            'outline': 'none'
        },
        '.wholesale-form button': {
            ...commonStyles,
            'background': '#4CAF50',
            'color': 'white',
            'border': 'none',
            'width': '100%',
            'margin-top': '20px'
        }
    };

    // Застосовуємо стилі для попапу
    Object.entries(popupStyles).forEach(([selector, styles]) => {
        $(selector).css(styles);
    });
});