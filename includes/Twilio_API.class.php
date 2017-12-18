<?php


class Twilio_API
{

	const TWILIO_VERIFICATION_START = 'https://api.authy.com/protected/json/phones/verification/start';
	const TWILIO_VERIFICATION_CHECK = 'https://api.authy.com/protected/json/phones/verification/check';
	const TWILIO_TEST_API_KEY = 'bYUtJ86gjz9aZcDDXOquAHHf9us7zCZn';

	static $supported_country_code = 1;

	static function send_code($phone_number) {
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_URL => Twilio_API::TWILIO_VERIFICATION_START,
			CURLOPT_POST => 1,
			CURLOPT_POSTFIELDS => array(
				'api_key' => Twilio_API::TWILIO_TEST_API_KEY,
				'via'  => 'sms',
				'phone_number' => $phone_number,
				'country_code' => self::$supported_country_code,
			)
		));

		$resp = curl_exec($curl);

		curl_close($curl);
		echo $resp;
	}

	static function verify_code( $phone_number, $verification_code ) {
		$curl = curl_init();

		$get_params = http_build_query( array(
			'api_key'           => Twilio_API::TWILIO_TEST_API_KEY,
			'verification_code' => $verification_code,
			'phone_number'      => $phone_number,
			'country_code'      => self::$supported_country_code,
		) );

		$check_request_url = Twilio_API::TWILIO_VERIFICATION_CHECK . '?' . $get_params;

		curl_setopt_array($curl, array(
			CURLOPT_RETURNTRANSFER  => 1,
			CURLOPT_URL             => $check_request_url
		));

		$resp = curl_exec($curl);

		curl_close($curl);
		echo $resp;
	}
}
