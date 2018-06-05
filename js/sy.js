$(document).ready(function() {
	//导航条显示与隐藏
	$('.btn-open').click(function() {
		$('.menu').addClass('tus')
		$('.mains').addClass('paures')
		$('.cir-dot').hide()
		
	});
	$('.btn-close').click(function() {
		$('.menu').removeClass('tus')
		$('.mains').removeClass('paures')
		$('.menu.tus .btn-open').css({
			'opacity': '1'
		})
		setTimeout(function () {
			$('.cir-dot').show()
		},1000)
	});
	//banner自动滚动轮播
	var n = 0;
	var firstLi = $('.section-1 slider li:first').clone(true);
	$('.section-1 .slider').append(firstLi);
	setInterval(function() {
		n++;
		if(n >= ($('.section-1 .slider li').length)) {
			n = 1
			$('.section-1 .slider li').eq(n).show().siblings('li').hide()
		} else {
			$('.section-1 .slider li').eq(n).show().siblings('li').hide()
		}
	}, 2500)
	//返回顶部事件
	var timer = null;
	var flag = true;
	var docWidth = document.documentElement.clientWidth;
	$('.top-btn').click(function() {
		clearInterval(timer);
		timer = setInterval(function() {
			var scoll = document.documentElement.scrollTop || document.body.scrollTop;
			var speed = Math.floor(-scoll / 20);
			flag = true;
			document.body.scrollTop = document.documentElement.scrollTop = scoll + speed;
			if(scoll == 0) {
				clearInterval(timer);
			}
		}, 30)
	})
	window.onscroll = function() {
		var scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop;
		if(scrollTopHeight > 670) {
			$('.top-btn').css('display', 'block');
		} else {
			$('.top-btn').css('display', 'none');
		}
		//flag为false时清除定时器，滚动条返回过程中，鼠标滚动使flag为false，返回中断停止  
		if(!flag) {
			clearInterval(timer);
		}
		flag = false;
	};
	//简介切换
	$('.section-2 .t-show .a-list a').click(function() {
		$(this).addClass('selected').siblings().removeClass('selected')
		$('.section-2 .content .t-show li').eq($(this).index()).addClass('selected').siblings().removeClass('selected')
	})
	$('.section-5 .nav-sm .a-list a').click(function() {
		$(this).addClass('selected').siblings().removeClass('selected')
		$('.section-5 .content .right .list li').eq($(this).index()).addClass('selected').siblings().removeClass('selected')
	})
	//菜单切换
	$('.menu-nav>ul li').click(function() {
		var j = $(this).index();
		k = $(this).index();
		$('.mains>section').eq(k).addClass('selected').siblings().removeClass('selected')
		$('.cir-dot li').eq(k).addClass('cir-dot-active').siblings().removeClass('cir-dot-active')
		$('html,body').stop(true, true)
		$('html,body').animate({
			scrollTop: bd * k
		}, 1000)
	})
	//全屏滚动
	var x = 0;
	var omark = false; //定义的开关
	var p = false; //定义的关于键盘的开关
	var bd = document.documentElement.clientHeight;
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	$(window).resize(function() {
		bd = document.documentElement.clientHeight
		$('.mains>section').css('height', bd)
		$('html,body').animate({
			scrollTop: bd * x
		}, 10)
		return false;
	});
	document.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0]; //兼容
		if(omark) return false;
		if(p) return false;
		p = true; //防止按住不放导致的BUG
		omark = true;
		if(e && e.keyCode == 38 || e && e.keyCode == 37) { //上
			x--
			if(x < 0) {
				x = 0
			}
			$('html,body').stop(true, true)
			$('html,body').animate({
				scrollTop: bd * x
			}, 1000, function() {
				omark = false
			})
		}
		if(e && e.keyCode == 40 || e && e.keyCode == 39) { //下
			x++
			if(x > 7) {
				x = 0
			}
			$('html,body').stop(true, true)
			$('html,body').animate({
				scrollTop: bd * x
			}, 1000, function() {
				omark = false
			})
		}
		$('.mains>section').eq(x).addClass('selected').siblings().removeClass('selected')
		$('.cir-dot li').eq(x).addClass('cir-dot-active').siblings().removeClass('cir-dot-active')
	};
	document.onkeyup = function() {
		p = false; //当松开的时候改变boolean值
	}
	//var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0); //合并写法
	function sss() {
		document.onmousewheel = function(e) {
			e = e || window.event;
			var wheelDelta = e.wheelDelta;
			if(!$('html,body').is(":animated")) {
				if(wheelDelta > 0) {
					x--
					if(x < 1) {
						x = 0
						$('html,body').stop(true, true)
						$('html,body').animate({
							scrollTop: bd * x
						}, 1000)
					} else {
						$('html,body').stop(true, true)
						$('html,body').animate({
							scrollTop: bd * x
						}, 1000)
					}
				}
				if(wheelDelta < 0) {
					x++
					if(x > 7) {
						x = 0
						$('html,body').stop(true, true)
						$('html,body').animate({
							scrollTop: bd * x
						}, 1000)
					} else {
						$('html,body').stop(true, true)
						$('html,body').animate({
							scrollTop: bd * x
						}, 1000)
					}
				}
			} else {}
			$('.mains>section').eq(x).addClass('selected').siblings().removeClass('selected')
			$('.cir-dot li').eq(x).addClass('cir-dot-active').siblings().removeClass('cir-dot-active') //控制圈圈的样式
			return false;
		}
	}
	sss();
	//关闭滚动
	function disabledMouseWheel(obj) {
		if(document.addEventListener) {
			obj.addEventListener('DOMMouseScroll', scrollFunc, false);
		} //W3C
		obj.onmousewheel = scrollFunc; //IE/Opera/Chrome
	}
	//开启滚动
	function scrollFunc(e) {
		e = e || window.event;
		if(e.preventDefault) {
			// Firefox
			e.preventDefault();
			e.stopPropagation();
		} else {
			// IE
			e.cancelBubble = true;
			e.returnValue = false;
		}
		return false;
	}
	//禁用整个窗口滚动事件
	//window.onload = disabledMouseWheel(this);
	//在某个元素上禁用鼠标滚动
	//$('#mCSB_6').each(function() {
	//	disabledMouseWheel(this);
	//});
	$('.cir-dot li').eq(0).addClass('cir-dot-active');
	$('.cir-dot li').mouseover(function() {
		var index = $(this).index();
		x = $(this).index();
		$('.mains>section').eq(x).addClass('selected').siblings().removeClass('selected')
		$(this).addClass('cir-dot-active').siblings().removeClass('cir-dot-active')
		$('html,body').stop(true, true)
		$('html,body').animate({
			scrollTop: bd * x
		}, 1000)
	});
	$('.sw-1 a').click(function() {
		$(this).css({
			'color': '#333333',
			'border-bottom': '1px solid #333'
		}).siblings('a').css({
			'color': '#737373',
			'border-bottom': 'none'
		})
		$('.sw-2>li').eq($(this).index()).addClass('selected').siblings('li').removeClass('selected')
		$('.img-list li').eq($(this).index()).show().siblings('li').hide()
	})
	$('.sw-btn-box .close-btn').click(function() {
		$('.sw-box-content .sw-sm').show()
		$('.sw-d').hide()
	});
	$('.icon-list').click(function() {
		$('.sw-box-content .sw-d').show()
		$('.sw-sm').hide()
	})
	$('.select-box>.select').click(function () {
		$(this).children('select').show()
		$(this).siblings('.select').children('select').hide()
	})
	$('.filter-list').click(function () {
		$(this).show()
	})
	$('.section-4 .list .sw-box ul>li:first-child .li').click(function () {
		$('.new-detailed').show()
		$('.section-4 .new-detailed .dt .dc>div').eq($(this).index()).show().siblings('.content').hide()
		$('.section-4>.list').hide()
	})
	
//	$('html,body').animate({
//		scrollTop: bd*0
//	}, 500)
	$('.mains>section').show(1000,function () {
		sss();
		$('.cir-dot li').eq(x).addClass('cir-dot-active').siblings().removeClass('cir-dot-active')
		$(this).addClass('selected')
		console.log(x)
	});
});
