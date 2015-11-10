/*
  Jquery Validation using jqBootstrapValidation
   example is taken from jqBootstrapValidation docs
  */
$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // something to have when submit produces an error ?
            // Not decided if I need it yet
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var phone = $("input#phone").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://docs.google.com/forms/d/1j_imTlwRgHF3tmXvG6JbpQY2z-WnozSdW6aUNGZRK-g/formResponse",
                crossDomain: true,
                type: "POST",
                dataType: "jsonp",
                data: {
                    entry_1085946881: name,
                    entry_108955255: phone,
                    entry_2103534609: email,
                    entry_76859446: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function(error) {
                    console.log(error);
                    // Fail message
                    // $('#success').html("<div class='alert alert-danger'>");
                    // $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    //     .append("</button>");
                    // $('#success > .alert-danger').append("<strong>Sorry " + firstName + " it seems that my mail server is not responding...</strong> Could you please email me directly to <a href='mailto:me@example.com?Subject=Message_Me from myprogrammingblog.com;>me@example.com</a> ? Sorry for the inconvenience!");
                    // $('#success > .alert-danger').append('</div>');
                    // //clear all fields
                    // $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

   /* $(".form-group").validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
    },
        message: "required",
        phone: {
            required: true,
            phoneUS: true
    },
    },
        messages: {
            name: "Please specify your name",

            message: "Please leave a comment",
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
        },
            phone: "You must submit a phone number with area code"
    }
    }); */

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
