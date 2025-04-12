jQuery(document).ready(function ($) {
    // Встановлюємо глобальну змінну статусу верифікації
    window.userVerificationStatus = verificationData.status === 'verified';

    // Функція для початку процесу верифікації
    function startVerification(email) {
        return $.ajax({
            url: '/wp-json/custom-verification/v1/verify',
            method: 'POST',
            data: {
                email: email,
                nonce: verificationData.nonce
            }
        });
    }

    // Функція для перевірки статусу верифікації
    function checkVerificationStatus() {
        return $.ajax({
            url: '/wp-json/custom-verification/v1/status',
            method: 'GET',
            data: {
                nonce: verificationData.nonce
            }
        }).done(function (response) {
            window.userVerificationStatus = response.status === 'verified';
            // Оновлюємо інтерфейс відповідно до статусу
            if (window.userVerificationStatus) {
                $('.verification-message').remove();
                $('.quantity, button.single_add_to_cart_button').show();
            }
        });
    }

    // Обробник форми верифікації
    $(document).on('submit', '.verification-form', function (e) {
        e.preventDefault();

        const email = $(this).find('input[name="email"]').val();

        startVerification(email)
            .done(function (response) {
                if (response.success) {
                    // Зберігаємо email в cookie для неавторизованих користувачів
                    if (!response.user_logged_in) {
                        document.cookie = `guest_email=${email}; path=/; max-age=86400`;
                    }

                    // Показуємо повідомлення про успішну відправку
                    alert('Код верифікації відправлено на ваш email');

                    // Перевіряємо статус кожні 30 секунд
                    const statusCheck = setInterval(function () {
                        checkVerificationStatus().done(function (response) {
                            if (response.status === 'verified') {
                                clearInterval(statusCheck);
                            }
                        });
                    }, 30000);
                }
            })
            .fail(function () {
                alert('Помилка при відправці коду верифікації');
            });
    });

    // Перевіряємо статус при завантаженні
    checkVerificationStatus();
}); 