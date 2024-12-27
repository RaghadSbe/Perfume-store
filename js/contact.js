$(document).ready(function() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        $('.error').hide();

        // Validate First Name
        if (!$('#firstName').val().trim()) {
            $('#firstNameError').show();
            isValid = false;
        }

        // Validate Last Name
        if (!$('#lastName').val().trim()) {
            $('#lastNameError').show();
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test($('#email').val())) {
            $('#emailError').show();
            isValid = false;
        }

        // Validate Mobile
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test($('#mobile').val())) {
            $('#mobileError').show();
            isValid = false;
        }

        // Validate Age
        const age = parseInt($('#age').val());
        if (!age || age < 18) {
            $('#ageError').show();
            isValid = false;
        }

        // Validate Country
        if (!$('#country').val().trim()) {
            $('#countryError').show();
            isValid = false;
        }

        // Validate Message
        if (!$('#message').val().trim()) {
            $('#messageError').show();
            isValid = false;
        }

        if (isValid) {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        }
    });
});