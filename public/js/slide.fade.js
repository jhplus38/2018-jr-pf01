/* var depth = 0;
var now = 0;
var end = $(".slide").length - 1;
$(".slide").each(function(){
	if(depth < $(this).css("z-index")) depth = $(this).css("z-index");
});
depth++;
ani();
function ani() {
	$(".slide").eq(now).css({"z-index":depth++, "opacity":0}); //css에 z-index를 안줬으니까 모두 0임 depth++을 지나면서 1이 되서 맨위에 보임
	$(".slide").eq(now).delay(3000).animate({"opacity":1}, 1000, function(){
		if(now == end) now = 0;
		else now++;
		ani();
	});
} */



/* var SlideFade = (function(){ //생성자 SlideFade 지역변수를 객체SlideFade의 전역변수로 지정한다
	function SlideFade(slides, delay, speed){
		this.slides = slides, 
		this.delay = delay,
		this.speed = speed
	}
	SlideFade.prototype.init = function(){

	}
	return SlideFade;
}());
var fadeBanner = new SlideFade($(".slide"),3000, 1000);
console.log(fadeBanner); */



var SlideFade = (function(){
	function SlideFade(slides, options) {
		var obj = this;
		this.slides = slides;
		this.delay = options.delay;
		this.speed = options.speed;
		this.now = 0;
		this.end = this.slides.length - 1;
		this.depth = 0;
		console.log(this.end);
		this.init(obj);
	}
	SlideFade.prototype.init = function(obj) {
		obj.slides.each(function(){
			if(obj.depth < $(this).css("z-index")) obj.depth = $(this).css("z-index");
		});
		obj.depth++;
		obj.ani(obj);
	}
	SlideFade.prototype.ani = function(obj) {
		var target = obj.slides.eq(obj.now);
		target.css({"z-index":obj.depth++, "opacity":0});
		target.delay(obj.delay).animate({"opacity":1}, obj.speed, function(){
			if(obj.now == obj.end) obj.now = 0;
			else obj.now++;
			obj.ani(obj);
		});
	}
	return SlideFade;
}());
