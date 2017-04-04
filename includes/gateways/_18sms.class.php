<?phpclass _18sms extends WP_SMS{	private $wsdl_link = "http://18sms.ir/webservice/rest/";	public $tariff = "http://18sms.ir/";	public $unitrial = true;	public $unit;	public $flash = "enable";	public $isflash = false;	/**	 * torpedos constructor.	 */	public function __construct()	{		parent::__construct();		$this->validateNumber = "09000000000";		$this->has_key = true;	}	/**	 * @return string|WP_Error	 */	public function SendSMS()	{		// Check gateway credit		if (is_wp_error($this->GetCredit())) {			return new WP_Error('account-credit', __('Your account does not credit for sending sms.', 'wp-sms'));		}		/**		 * Modify sender number		 *		 * @since 3.4		 * @param string $this ->from sender number.		 */		$this->from = apply_filters('wp_sms_from', $this->from);		/**		 * Modify Receiver number		 *		 * @since 3.4		 * @param array $this ->to receiver number		 */		$this->to = apply_filters('wp_sms_to', $this->to);		/**		 * Modify text message		 *		 * @since 3.4		 * @param string $this ->msg text message.		 */		$this->msg = apply_filters('wp_sms_msg', $this->msg);		$response = ($this->wsdl_link . "sms_bank_send?login_username=" . $this->username . "&login_password=" . $this->password . "&receiver_number=" . implode(',', $this->to) . "&note_arr[]=" . $this->msg . "&sender_number=" . $this->from);		echo '<pre>' . print_r($response, 1) . '</pre>';		exit();		// Check response error		if (is_wp_error($response)) {			return new WP_Error('send-sms', $response->get_error_message());		}		$response_code = wp_remote_retrieve_response_code($response);		if ($response_code == '200') {			$result = json_decode($response['body']);			if (isset($result->status) and $result->status == 'ERR') {				return new WP_Error('send-sms', $result->error_string);			} else {				$this->InsertToDB($this->from, $this->msg, $this->to);				/**				 * Run hook after send sms.				 *				 * @since 2.4				 * @param string $result result output.				 */				do_action('wp_sms_send', $result);				return $result;			}		} else {			return new WP_Error('send-sms', $response['body']);		}	}	/**	 * @return int|WP_Error	 */	public function GetCredit()	{		// Check username and password		if (!$this->username && !$this->password) {			return new WP_Error('account-credit', __('Username/Password does not set for this gateway', 'wp-sms'));		}		$response = wp_remote_get($this->wsdl_link . "user_info?login_username=" . $this->username . "&login_password=" . $this->password);		// Check gateway credit		if (is_wp_error($response)) {			return new WP_Error('account-credit', $response->get_error_message());		}		$response_code = wp_remote_retrieve_response_code($response);		if ($response_code == '200') {			$result = json_decode($response['body']);			if ($result->result == ':true') {				return $result->list->cash;			} else {				return new WP_Error('account-credit', $result->error);			}		} else {			return new WP_Error('account-credit', $response['body']);		}		return 1;	}}