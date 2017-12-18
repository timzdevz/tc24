jQuery(document).ready(function($) {

    var ajaxUrl = 'includes/ajax.php';

    $('form input').on('invalid', function () {
        var form = $(this).closest('form');
        form.addClass('validated');
        form.find('input').off('invalid');
    });

    $('#form').submit(function () {
        // in case we already verified number
        if (window.phoneVerified) {
            Popup.open('#verification-popup');
            return false;
        }

        var $form = $(this);
        var phoneNumber =  window.phoneNumber = $form.find('#cellphone').val();
        window.formData = $form.serialize();

        $form.find('.submit-btn').attr('disabled', 'disabled');

        $.post(ajaxUrl, {
            'action': 'send_code',
            'phone_number': phoneNumber
        }, function(data) {
            if (data.success) {
                Popup.open('#verification-popup');
                $('#verification-popup').find('.number-sent').text(phoneNumber);
                $('#verification_code').focus();
            } else if (data.errors) {
                if ( ! $.isArray(data.errors)) {
                    data.errors = [].concat(data.errors);
                }

                for (var error in data.errors) {
                    if (data.errors.hasOwnProperty(error)) {
                        alert(data.errors[error].message);
                    }
                }
            }

            $form.find('.submit-btn').removeAttr('disabled');
        }, 'json');


        return false;
    });

    $('#verification-popup').submit(function (e) {
        e.preventDefault();
        var $verificationForm = $(this);
        var verificationCode = $verificationForm.find('#verification_code').val();
        $verificationForm.find('.submit-btn').attr('disabled', 'disabled');

        $.post(ajaxUrl, {
            'action': 'verify_code',
            'phone_number': window.phoneNumber,
            'verification_code': verificationCode
        }, function(data) {
            if (data.success) {
                $verificationForm.find('.text-verification-step-one').hide().end()
                    .find('.text-verification-step-two').show();

                window.phoneVerified = true;

            } else {
                var errorMsg = data.message ? data.message : "Oops, there is error occurred, please try again :(";
                alert(errorMsg);
            }

            $verificationForm.find('.submit-btn').removeAttr('disabled');
        }, 'json');

        return false;
    });

    $('.resend-code').click(function () {

        if (window.resendInProgress) {
            return false;
        }

        window.resendInProgress = true;

        var $resendLink = $(this);
        $resendLink.addClass('in-progress');

        $.post(ajaxUrl, {
            'action': 'send_code',
            'phone_number': window.phoneNumber
        }, function (data) {
            if (data.success) {
                alert("Verification code has been resent");
            } else {
                if ( ! $.isArray(data.errors)) {
                    data.errors = [].concat(data.errors);
                }

                for (var error in data.errors) {
                    if (data.errors.hasOwnProperty(error)) {
                        alert(data.errors[error].message);
                    }
                }
            }

            $resendLink.removeClass('in-progress');
            window.resendInProgress = false;
        }, 'json');
    });

    // continue button click
    $('#continue-btn').click(function (e) {
        e.preventDefault();
        window.Popup.close();


        $.post(ajaxUrl, {
            'action': 'save_card',
            'data': window.formData
        }, function (data) {
            alert(data.success ?
                "Your card has been successfully saved!" :
                "Oops, there is error occurred, please try again :(");
        }, 'json');

        return false;
    });
});

