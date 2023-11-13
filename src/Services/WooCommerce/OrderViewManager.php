<?php

namespace WP_SMS\Services\WooCommerce;

use WP_SMS\Notification\NotificationFactory;
use WP_SMS\Helper;

class OrderViewManager
{
    public const FIELD_MOBILE = 'wpsmswoopro_mobile';

    public function init()
    {
        add_action('add_meta_boxes', array($this, 'registerMetaBoxes'));
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));
    }

    // Enqueue wp-sms woocommerce admin scripts
    function admin_scripts()
    {
        global $sms;
        $nonce = wp_create_nonce('wp_rest');

        wp_enqueue_script('wpsms-woocommerce-admin', WP_SMS_URL . 'assets/js/admin-order-view.js', ['jquery', 'jquery-ui-spinner'], WP_SMS_VERSION);
        wp_localize_script('wpsms-woocommerce-admin', 'wpSmsWooCommerceTemplateVar', array(
                'restUrls'   => array(
                    'sendSms' => get_rest_url(null, 'wpsms/v1/send')
                ),
                'nonce'      => $nonce,
                'senderID'   => $sms->from,
                'flashState' => $sms->flash,
            )
        );
    }

    /**
     * Register all order meta boxes
     */
    public function registerMetaBoxes($post_type)
    {
        $screenId = wc_get_page_screen_id('shop-order');

        if ($post_type == $screenId) {
            add_meta_box('wpsms-woocommerceSendSMS', __('Send SMS', 'wp-sms'), [$this, 'renderSendSmsMetaBox'], $screenId, 'side', 'core');
        }
    }

    /**
     * Render Send SMS meta box
     *
     * @param \WP_Post|\Automattic\WooCommerce\Admin\Overrides\Order $post
     */
    public function renderSendSmsMetaBox($output)
    {
        // Backward compatibility with new custom WooCommerce order table.
        if ($output instanceof \Automattic\WooCommerce\Admin\Overrides\Order or $output instanceof \WC_Order) {
            $order = $output;
        } else {
            $order = wc_get_order($output->ID);
        }

        $numbers = [];

        if ($order) {
            $numbers[] = $order->get_billing_phone();

            // plugin mobile field legacy.
            if ($order->get_meta(self::FIELD_MOBILE)) {
                $numbers[] = $order->get_meta(self::FIELD_MOBILE);
            }

            // wp-sms-pro mobile field.
            if ($order->get_meta('mobile')) {
                $numbers[] = $order->get_meta('mobile');
            }

            // get from main core plugin
            $fetchFromCoreHelper = Helper::getWooCommerceCustomerNumberByOrderId($order->get_id());
            if ($fetchFromCoreHelper) {
                $numbers[] = $fetchFromCoreHelper;
            }

            // Remove duplicates
            $numbers = array_unique($numbers);
        }

        echo Helper::loadTemplate('admin/order-view-box.php', [
            'variables' => NotificationFactory::getWooCommerceOrder()->printVariables(),
            'numbers'   => apply_filters('wpsms_woocommerce_order_view_mobile_numbers', $numbers, $order),
            'order_id'  => $order->get_id()
        ]);
    }
}