<?php

namespace WP_SMS\Gateway;

use Exception;

class directsend extends \WP_SMS\Gateway
{
    private $wsdl_link = "https://directsend.co.kr/index.php/api_v2/sms_change_word";
    public $tariff = "https://directsend.co.kr";
    public $unitrial = false;
    public $unit;
    public $flash = "false";
    public $isflash = false;

    public function __construct()
    {
        parent::__construct();
        $this->bulk_send      = true;
        $this->has_key        = true;
        $this->validateNumber = "";
        $this->help           = "";
        $this->gatewayFields  = [
            'username' => [
                'id'   => 'gateway_username',
                'name' => 'Username',
                'desc' => 'Directsend issued ID.',
            ],
            'has_key'  => [
                'id'   => 'gateway_key',
                'name' => 'API Key',
                'desc' => 'Directsend issued API key.',
            ],
            'from'     => [
                'id'   => 'gateway_sender_id',
                'name' => 'Sender Number',
                'desc' => 'Enter the sender number.',
            ]
        ];
    }

    public function SendSMS()
    {
        /**
         * Modify sender number
         *
         * @param string $this ->from sender number.
         * @since 3.4
         *
         */
        $this->from = apply_filters('wp_sms_from', $this->from);

        /**
         * Modify Receiver number
         *
         * @param array $this ->to receiver number
         * @since 3.4
         *
         */
        $this->to = apply_filters('wp_sms_to', $this->to);

        /**
         * Modify text message
         *
         * @param string $this ->msg text message.
         * @since 3.4
         *
         */
        $this->msg = apply_filters('wp_sms_msg', $this->msg);

        try {

            $recipients = array_map(function ($recipient) {
                return array(
                    'mobile' => $recipient
                );
            }, $this->to);

            $response = $this->request('POST', "{$this->wsdl_link}", [], [
                'headers' => [
                    'cache-control' => 'no-cache',
                    'content-type'  => 'application/json',
                    'charset'       => 'utf-8',
                ],
                'body'    => json_encode([
                    'username' => $this->username,
                    'key'      => $this->has_key,
                    'receiver' => $recipients,
                    'message'  => $this->msg,
                    'sender'   => $this->from,
                ])
            ]);

            if (isset($response->status) && $response->status != '0') {
                throw new Exception($response);
            }

            //log the result
            $this->log($this->from, $this->msg, $this->to, $response);

            /**
             * Run hook after send sms.
             *
             * @param string $response result output.
             * @since 2.4
             *
             */
            do_action('wp_sms_send', $response);

            return $response;

        } catch (\Exception $e) {
            $this->log($this->from, $this->msg, $this->to, $e->getMessage(), 'error');

            return new \WP_Error('send-sms', $e->getMessage());
        }
    }

    public function GetCredit()
    {
        try {
            // Check username and password
            if (!$this->username or !$this->has_key) {
                throw new \Exception(__('The Username/API key for this gateway is not set.', 'wp-sms'));
            }
            return 1;

        } catch (\Exception $e) {
            $error_message = $e->getMessage();
            return new \WP_Error('account-credit', $error_message);
        }
    }

}