// function to get params from 
function GetURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i ++)
	{
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) 
		{
			//alert(sParameterName[1]);
			return sParameterName[1];
		}
	}
};

$(document).ready(function() {
	var show_error, stripeResponseHandler, submitHandler;

// function to handle the submit of the form and intercept the default event
	submitHandler = function(event) {
		// Return which DOM element triggered the event:
		// It is often useful to compare event.target to this in order to d
		// etermine if the event is being handled due to event bubbling.
		var $form = $(event.target);
		// disble the submit button from being submitted again
		// find input element with type submit
		$form.find("input[type=submit]").prop("disabled", true);
		if(Stripe) {
			Stripe.card.createToken($form, stripeResponseHandler);
		} else {
			show_error("Failed to load credit card processing funtionality. Please reload the page");
		}
		//returning false from an event handler will prevent the default action (which is to submit the form in this case) associated with an event; 
		//you could also do this via calling event.preventDefault() or setting event.returnValue = false (IE); 
		//in order to stop the event from bubbling, 
		//you'll have to call event.stopPropagation() or setting event.cancelBubble = true (IE) 
		return false;
}

// initiate submit handler listener for any form with class cc_form

// handle event of plan drop down change
var handlePlanChange = function(plan_type, form) {
	var $form = $(form);
	//alert("I am here");
	//alert(plan_type);

	if (plan_type === undefined) {
		plan_type = $('#tenant_plan :selected').val();
	}
	//alert("plan type = " + plan_type );

	if (plan_type == 'premium') {
		//alert("credit card info required");
		$('[data-stripe]').prop('required', true);
		// Remove an event handler. .off( events [, selector ] [, handler ] )
		$form.off('submit');
		$form.on('submit', submitHandler);
		// find all elements with data-stripe attribute
		$('[data-stripe]').show();
	} else {
		$('[data-stripe]').hide();
		$form.off('submit');
		$('[data-stripe]').removeProp('required');
	}
};
// Set up plan change event listener # tement_plan id in the forms for cc_form
	$("#tenant_plan").on('change', function(event) {
		handlePlanChange($('#tenant_plan :selected').val(), ".cc_form");
	});

// call plan change handler so that the plan is set correctly in the dropdown when the page loads

handlePlanChange(GetURLParameter('plan'), ".cc_form");

// function to handle the token received from stripe and handle credit card fields
stripeResponseHandler = function(status, response) {
	var token,  $form;

	$form = $('.cc_form');

	if (response.error) {
		console.log(response.error.message);
		show_error(response.error.message);
		$form.find("input[type=submit]").prop("disabled", false);
	} else {
		token = response.id;
		$form.append($("<input type=\"hidden\" name=\"payment[token]\" />").val(token));
		$("[data-stripe=number]").remove();
		$("[data-stripe=cvv]").remove();
        $("[data-stripe=exp-year]").remove();
        $("[data-stripe=exp-month]").remove();
        $("[data-stripe=label]").remove();
          $form.get(0).submit();
	}
	return false;
};
// function to show errors when Stripe functionality returns an error

show_error = function(message) {
        if ($("#flash-message").size() < 1) {
            $('div.container.main div:first').prepend("<div id='flash-messages'></div>");
          }
          $("#flash-messages").html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">x</a><div id = "flash_alert" > ' + message + ' < /div></div > ');
            $('.alert').delay(5000).fadeOut(3000);
            return false;
          };
});