//This is a pen based off of Codewoofy's eyes follow mouse. It is just cleaned up, face removed, and then made to be a little more cartoony. https://codepen.io/Codewoofy/pen/VeBJEP
if(detectmob()){
	$(".hero-body").css("background-image", "url('images/dev-mobile.jpg')");
}else{
	$(".hero-body").css("background-image", "url('images/dev.jpg')");
}

$(".move-area").mousemove(function(event) {
	var eye = $(".eye");
	var x = (eye.offset().left) + (eye.width() / 2);
	var y = (eye.offset().top) + (eye.height() / 2);
	var rad = Math.atan2(event.pageX - x, event.pageY - y);
	var rot = (rad * (180 / Math.PI) * -1) + 180;
	//console.log(rot);
	eye.css({
		'-webkit-transform': 'rotate(' + rot + 'deg)',
		'-moz-transform': 'rotate(' + rot + 'deg)',
		'-ms-transform': 'rotate(' + rot + 'deg)',
		'transform': 'rotate(' + rot + 'deg)'
	});

	if(detectmob()){
		if((rot <= 100) || (rot >= 250)){
			$(".hero-body").css("background-image", "url('images/dev-mobile.jpg')");

		}else{
			$(".hero-body").css("background-image", "url('images/photo-mobile.jpg')");
		}
	}else{
		if(rot >= 180){
			$(".hero-body").css("background-image", "url('images/dev.jpg')");
		}else{
			$(".hero-body").css("background-image", "url('images/photo.jpg')");
		}
	}
});

function detectmob() { 
	if(navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i))
	{
		return true;
	}
	else {
		return false;
	}
}

$('.hero-body').on('click', function(){
	var eye = $(".eye");
	var x = (eye.offset().left) + (eye.width() / 2);
	var y = (eye.offset().top) + (eye.height() / 2);
	var rad = Math.atan2(event.pageX - x, event.pageY - y);
	var rot = (rad * (180 / Math.PI) * -1) + 180;

	if(detectmob()){
		if((rot <= 100) || (rot >= 250))
			document.location.href = 'dev.html';
		else
			document.location.href = 'https://rizzonfotografia.myportfolio.com/';
	}else{
		if(rot >= 180)
			document.location.href = 'dev.html';
		else
			document.location.href = 'https://rizzonfotografia.myportfolio.com/';
	}
});