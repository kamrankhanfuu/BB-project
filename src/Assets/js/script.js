import $ from 'jquery'; 

$(".open_popup").click(function () {
   $(this).parent(".popup_main").children(".popup_body").addClass("popup_body_show");
   });
 $(".popup_close").click(function () {
   $(".popup_body").removeClass("popup_body_show");
   });
 $(".popup_back").click(function () {
   $(".popup_body").removeClass("popup_body_show");
   });
   
 var minVal = 1, maxVal = 20; // Set Max and Min values
// Increase product quantity on cart page
$(".increaseQty").on('click', function(){
		var $parentElm = $(this).parents(".qtySelector");
		$(this).addClass("clicked");
		setTimeout(function(){
			$(".clicked").removeClass("clicked");
		},100);
		var value = $parentElm.find(".qtyValue").val();
		if (value < maxVal) {
			value++;
		}
		$parentElm.find(".qtyValue").val(value);
});
// Decrease product quantity on cart page
$(".decreaseQty").on('click', function(){
		var $parentElm = $(this).parents(".qtySelector");
		$(this).addClass("clicked");
		setTimeout(function(){
			$(".clicked").removeClass("clicked");
		},100);
		var value = $parentElm.find(".qtyValue").val();
		if (value > 1) {
			value--;
		}
		$parentElm.find(".qtyValue").val(value);
	}); 
	
	
	
	

$(function() {
    var header = $(".tabs-nav");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >=500) {
            header.removeClass('media-img').addClass("media-img-sticky");
        } else {
            header.removeClass("media-img-sticky").addClass('media-img');
        }
    });
});


	
$(function() {
    var header = $(".empty-outer");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >=850) {
            header.removeClass('media-img').addClass("media-img-sticky");
        } else {
            header.removeClass("media-img-sticky").addClass('media-img');
        }
    });
});

 

	
	 

   
   