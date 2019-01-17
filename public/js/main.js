/***** 공통사항 변수 선언 ******/
const log = console.log; //const(상수 선언)

var $bar = $(".navs_mo");
var $bar2 = $(".nav_close");
var $nav = $(".navs_mo_sub");
var navWid = $nav.width(); //제이쿼리 변수라는 걸 알려주기 위해 $붙이기도 함

/***** 반응형/높이를 위한 resize ******/
$(window).resize(function(){
	navInit();	//모바일 네비게이션 가리기
	banInit();	//배너 Auto height
}).trigger("resize");

/***** 메인 배너 ******/
function banInit() {
	$(".banner_wrap").height($(".banner_wrap > li").height()); /*banner에 높이가 생기기 때문에(: css에서의 rel(.banner_wrap에 rel을 주면서 .banner에 높이o)) 여기서는 따로 줄 필요없음*/
}

/***** 모바일 네비게이션 ******/
$bar.click(navToggle);
$bar2.click(navToggle);
function navInit() {
	navWid = $nav.width();
	if($(window).width() > 768) navHide(); //pc버전fire
}
function navHide() {
	$nav.css({"left":-navWid+"px"});
}
function navToggle() {
	if($nav.position().left == 0) $nav.stop().animate({"left": -navWid+"px"}, 500);
	else $nav.stop().animate({"left": 0}, 500);
}

/***** Masonry *****/
var masonryOption = {
	itemSelector: '.grid-item',
	columnWidth: '.grid-sizer',
	percentPosition: true //반응형 true
};
$('.grid').imagesLoaded( function() {
  $('.grid').masonry(masonryOption);
});

/***** 다음 지도 *****/
$(window).resize(function(){
	var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
	var options = { //지도를 생성할 때 필요한 기본 옵션
		center: new daum.maps.LatLng(37.572070, 126.987287), //지도의 중심좌표.
		level: 3 //지도의 레벨(확대, 축소 정도)
	};
	var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
	map.setDraggable(false);
	map.setZoomable(false);
	
	var clusterer = new daum.maps.MarkerClusterer({
		map: map,
		gridSize: 35,
		averageCenter: true,
		minLevel: 6,
		disableClickZoom: true,
		styles: [{
				width : '53px', height : '52px',
				background: 'url(cluster.png) no-repeat',
				color: '#fff',
				textAlign: 'center',
				lineHeight: '54px'
		}]
	});
	var marker = new daum.maps.Marker({
		position: new daum.maps.LatLng(37.572070, 126.987287)
	});
	clusterer.addMarker(marker);
}).trigger("resize");

/***** bt_top *****/
$("#bt_top").click(function(){
	$("html, body").stop().animate({"scrollTop":0}, 2000);
});

/*
var options = {
	speed: 3000,
	gap: 3000,
	type: "fade",
	pager: true
};
var mainBanner = new Slide($(".banner"), $(".banner_wrap"), $(".slide"), options);
var options = [{
	delay: 3000,
	speed: 1000
},{
	delay: 1000,
	speed: 200
},{
	delay: 2000,
	speed: 100
}];
var mainBanner = new FadeSlide($(".banner_wrap").eq(0).find(".slide"), options[0]);
var mainBanner2 = new FadeSlide($(".banner_wrap").eq(1).find(".slide"), options[1]);
var mainBanner3 = new FadeSlide($(".banner_wrap").eq(2).find(".slide"), options[2]);
//접근법
$(".banner_wrap").eq(0).find(".slide")
$(".slide", $(".banner_wrap").eq(0))
*/

//new SlideFade($(".slide"), {delay:3000, speed:1000});

var options = {
	delay: 3000,
	speed: 300,
	dir: -1,
	dirBtnUse: true,
	dirBtn:[$("#bt_prev"), $("#bt_next")]
};
var horiBanner = new SlideHori($("#banner1"), $("#banner1").find(".slide"), options);

/*
$(".banner_wrap").find(".slide")
$(".banner_wrap").children(".slide")
$(".slide", $(".banner_wrap"))
*/

/***** EmailJs *****/
/*
//선택자
document.getElementById('contact-form') //ES5
document.querySelector('#contact-form') //ES6
$("#contact-form") //jquery
document.getElementById('contact-form').addEventListener('submit', function(event) {
		event.preventDefault();
		this.contact_number.value = Math.random() * 100000 | 0;
		emailjs.sendForm('contact_service', 'contact_template', this);
});
*/
emailjs.init("user_LbA57fDFJuuEFAfQO72pu");//본인거로...
$('#contact-form').on('submit', function(e) {
		e.preventDefault();
		$("input[name='contact_number']").val(Math.random() * 100000 | 0);
		emailjs.sendForm('jh', 'template_SXJw2WfR', this).then(function(res){
			alert("메세지 전송에 성공했습니다. \n빠른 시간 내에 답변드리겠습니다.");
		}, function(err){
			alert("메세지 전송에 실패했습니다. \n다시 시도해주세요.");
		});
		$(this)[0].reset(); //전송 시, form 리셋
});

/***** 네비게이션 구현 *****/
$(".nav").click(goLoc);
$(".logo").click(goLoc);
function goLoc(){
	var nav = $(this); //클릭한 거
	var i = $(this).data("page");
	var pos = $(".page").eq(i).offset().top; //내가 선택한 page의 값에 따라 pos값이 나옴
	$("html, body").stop().animate({"scrollTop":pos}, 1000, function(){
		$(".nav").css({"color":"#333"});
			$(".nav").css({"color":"#333"}); 
			if(i>0) nav.css({"color":"#b30"}); //선택된 페이지만 색 다르게
	});
}

//$("html, body").stop().animate({"scrollTop":2000}, 1000);