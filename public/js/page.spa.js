var gap = 200; 
 //페이지에 도달했을 때 애니메이션 나타나는 현상에 대한 gap의 값을 200(속도)로 처리 (어느정도 스크롤 됐을 때 나타나는가)
 // page가 나타나기 전 px
var now = 0; // 현재 페이지
var scTop = 0; // 현재 문서의 scrollTop
var pages = new Array(); //각각의 페이지가 상단으로부터(맨끝) 떨어진 거리
var scFn = function(){
	$(".page").each(function(i){
		/* pages[i] = $(this).height(); //각각의 .page에 높이를 넣어줘라 */
		pages[i] = $(this).offset().top;
	});
	scTop = $(window, "html, body").scrollTop();
	now = pages.length - 1;
	for(var i in pages) {
		if(scTop + gap < pages[i]) {
			now = i - 1;
			break;
		}
	}
	$(".page").eq(now).find(".spa_ani").each(function(){
		var name = "opaShow";
		var duration = "0.5s";
		var delay = 0;
		if($(this).data("name") != "" && $(this).data("name") != undefined) {
			name = $(this).data("name");	//html에서 data-name 값
		}
		if($(this).data("duration") != "" && $(this).data("duration") != undefined) {
			duration = $(this).data("duration");	//html에서 data-duration 값
		}
		if($(this).data("delay") != "" && $(this).data("delay") != undefined) {
			delay = $(this).data("delay");	//html에서 data-delay 값
		}
		$(this).css({
			"animation-name": name, 
			"animation-duration": duration,
			"animation-delay": delay
		});
	});
	$(".page").eq(now).find(".fn_ani").each(function(){
		eval($(this).data("fn")+"($(this))");
	});
};
$(window, document, "html, body").on("scroll touchmove", scFn);

function barMove(obj) {
	if(obj.width() == 0) obj.stop().animate({"width":obj.html()}, 2000);
}