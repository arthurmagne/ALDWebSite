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


});

