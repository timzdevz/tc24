<?php

require_once 'Twilio_API.class.php';

if ( isset( $_POST['action'] ) ) {

	if ( $_POST['action'] == 'send_code' ) {
		$phone_number = $_POST['phone_number'];

		Twilio_API::send_code( $phone_number );
	} elseif ( $_POST['action'] == 'verify_code' ) {
		$phone_number = $_POST['phone_number'];
		$verification_code = $_POST['verification_code'];

		Twilio_API::verify_code( $phone_number, $verification_code );
	} elseif ( $_POST['action'] == 'save_card' ) {
		// process card here $_POST['data']
		// ...
//		echo json_encode( array( 'success' => false ) );
		echo json_encode( array( 'success' => true ) );
	}

}
