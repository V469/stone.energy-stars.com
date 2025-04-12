<div class="wrap">
    <h1>Управління верифікацією користувачів</h1>
    
    <?php
    global $wpdb;
    $table_name = $wpdb->prefix . 'custom_user_verification';
    
    // Обробка дій
    if (isset($_POST['action']) && isset($_POST['user_id'])) {
        $user_id = intval($_POST['user_id']);
        $action = sanitize_text_field($_POST['action']);
        
        if ($action === 'verify') {
            $wpdb->update(
                $table_name,
                array('verification_status' => 'verified'),
                array('id' => $user_id),
                array('%s'),
                array('%d')
            );
        } elseif ($action === 'reject') {
            $wpdb->update(
                $table_name,
                array('verification_status' => 'rejected'),
                array('id' => $user_id),
                array('%s'),
                array('%d')
            );
        }
    }
    
    // Отримання списку користувачів
    $users = $wpdb->get_results("
        SELECT * FROM {$table_name}
        ORDER BY created_at DESC
    ");
    ?>
    
    <table class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th>Email</th>
                <th>Телефон</th>
                <th>Статус</th>
                <th>Тип верифікації</th>
                <th>Дата створення</th>
                <th>Дії</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($users as $user): ?>
                <tr>
                    <td><?php echo esc_html($user->user_email); ?></td>
                    <td><?php echo esc_html($user->user_phone); ?></td>
                    <td>
                        <span class="status-<?php echo esc_attr($user->verification_status); ?>">
                            <?php echo esc_html($user->verification_status); ?>
                        </span>
                    </td>
                    <td><?php echo esc_html($user->verification_type); ?></td>
                    <td><?php echo esc_html($user->created_at); ?></td>
                    <td>
                        <?php if ($user->verification_status !== 'verified'): ?>
                            <form method="post" style="display: inline;">
                                <input type="hidden" name="user_id" value="<?php echo esc_attr($user->id); ?>">
                                <input type="hidden" name="action" value="verify">
                                <button type="submit" class="button button-primary">Верифікувати</button>
                            </form>
                        <?php endif; ?>
                        
                        <?php if ($user->verification_status !== 'rejected'): ?>
                            <form method="post" style="display: inline; margin-left: 10px;">
                                <input type="hidden" name="user_id" value="<?php echo esc_attr($user->id); ?>">
                                <input type="hidden" name="action" value="reject">
                                <button type="submit" class="button">Відхилити</button>
                            </form>
                        <?php endif; ?>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    
    <style>
        .status-verified { color: #46b450; }
        .status-pending { color: #ffb900; }
        .status-rejected { color: #dc3232; }
    </style>
</div> 