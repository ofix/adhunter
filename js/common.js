var adUrls = [
  {"r":"blog.csdn.net","f":csdn,"p":{}},
  {"r":"www.cnblogs.com","f":cnblogs,"p":{}},
  {"r":"www.baidu.com","f":baidu,"p":{}},
  {"r":"www.yiibai.com/spring_mvc/","f":yiibai,"p":{}}
];
function removeAds(eles){
	eles.forEach(function(v,i,a){
	   $(v).hide().css("overflow","hidden");
	});
}
function killAd(){
    var url = window.location.href;
    adUrls.forEach(function(v,i,a){
        r = v.r;
        if(url.indexOf(r) !== -1){
            (v.f)();
        }
    });
}
var userFlag=0;
var gTimer;
function killAdTimeout(flag){
    if(userFlag !==0){
        return;
    }
	if(arguments[0] && userFlag ===0){
		userFlag = 1;
	}
    var _c = 0;
    gTimer = setInterval(function(){
        if(_c>10){
            clearInterval(gTimer);
            _c=0;
            userFlag = 0;
        }else{
            killAd();
            _c++;
        }
    },600);
}
var gEmitCss = 0;
var gEmitJs = 0;
var gEmitHtml = 0;
//发射代码
function emitCode(code,ele){
    $(ele).append(code);
}
function compile(code,template){
    for(var i=0,l=code.length+1; i<l; i++){
        pattern = /#\d+/;
        template = template.replace(pattern,code[i]);
    }
    return template;
}
function emitCss_cnblogs(css){
    if(gEmitCss>0){
        return;
    }
    gEmitCss++;
    var template = '<style type="text/css">#1</style>';
    var code = [
       `.compile-mode{
            width:120px;
            height:64px;
            line-height:64px;
            background-color:#D1B3DF;
            color:#714386;
            text-align:center;
            position:fixed;
            right:20px;
            bottom:20px;
            cursor:pointer;
        }`
    ];
    var css = document.createElement('style');
    css.type = 'text/css';
    css.appendChild(document.createTextNode(code.join(' ')));
    $(document.head).append(css);
}

function emitJs_cnblogs(js,ele){
    if(gEmitJs>0){
        return;
    }
    gEmitJs++;
    var code = [
         `$(document).on('click','.compile-mode',function(){
            var ele = ["#header","#right","#mystats",
            "#mylinks","#bnr_pic","#sideBar",
            "#MySignature","#blog_post_info_block",".postDesc",
            "#comment_form","#footer","#blog-comments-placeholder"];
            ele.forEach(function(v,i,a){
                $(v).toggle();
            });
         });`
    ];
    var js = document.createElement('script');
    js.textContent = code.join(' ');
    document.body.appendChild(js);
}
function emitHtml_cnblogs(){
    if(gEmitHtml>0){
        return;
    }
    gEmitHtml++;
    var template = '<div class="compile-mode">切换模式</div>';
    $(document.body).append(template);
}
//CSDN
function csdn(){
	var o = [".meau-list","header","#csdn-toolbar","aside",".comment-box",".recommend-box",".t0",".related-article",
	".article-bar-bottom",".pulllog-box",'.p4course_target',".pulllog-box",".meau-gotop-box","#pic_container",".answer-box","#_kfgdmxteyi",".pic_container"];
	removeAds(o);
}
//博客园
function cnblogs(){
	var o = ["#header","#right","#mystats","#mylinks","#bnr_pic","#sideBar","#MySignature","#blog_post_info_block",".postDesc","#comment_form","#footer","#blog-comments-placeholder"];
	removeAds(o);
    clearInterval(gTimer);
	// $("#left").css({"left":"0px","top":"0px"});
	// $(".post").css({'border':"none;"});
 //    $("#mainContent").css({"margin-left":"150px","margin-right":"150px"});
 //    $("body").css({"background":""});
    emitCss_cnblogs();
    emitHtml_cnblogs();
    emitJs_cnblogs();
}
//yiibai
function yiibai(){
    var o = ["#google_image_div","#adContent-clickOverlay","#adv-javalive",
    "#adContent","iframe",".adsbygoogle","#footer-copyright",".footer"];
    removeAds(o);
}
//百度
function baidu(){
	var $normal_ads = $("span:contains('广告')");
	var $brand_ads = $("a:contains('品牌广告')");
	function removeItem(v){
        var $this = $(v);
        var i=0;
        while($this.parent().attr('id')!=='content_left'&&i<10){
            $this = $this.parent();
            i++;
        }
        if($this.parent().attr('id') === 'content_left') {
            $this.fadeOut(1200);
        }
	}
	$normal_ads.each(function(i,v){
		removeItem(v);
	});
	$brand_ads.each(function(i,v){
		removeItem(v);
	});
	$('.s_btn').one('click', function(){
		killAdTimeout(true);
	});
}