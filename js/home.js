$( document ).ready(function() {
	$pos = $(".navbar-wrapper").position().top;
	$(window).scroll(function(){
	    $(".navbar-wrapper").css("top",Math.max(0,$pos-$(this).scrollTop()));
	    if (($pos-$(this).scrollTop()) <= 0){
	    	$(".navbar-wrapper").addClass("fixed");
	    }else{
	    	$(".navbar-wrapper").removeClass("fixed");
	    }
	});

	$(".recherche").on("click", function(event) {
		// event.preventDefault();
		// event.stopPropagation();
		$(".navbar-container").toggleClass("show");
		$(".search-form-container").toggleClass("show");
		setTimeout(function() {
			$(".search-form-container").toggleClass("disp");
		}, 500);
	});


});

