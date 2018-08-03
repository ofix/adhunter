var adUrls = [
  {"r":"https://blog.csdn.net","f":csdn,"p":{}},
  {"r":"https://www.cnblogs.com","f":cnblogs,"p":{}},
  {"r":"https://www.baidu.com","f":baidu,"p":{}},
];
function removeAds(eles){
	eles.forEach(function(v,i,a){
	   $(v).hide().width(0).height(0).css("overflow","hidden");
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
function killAdTimeout(flag){
    if(userFlag !==0){
        return;
    }
	if(arguments[0] && userFlag ===0){
		userFlag = 1;
	}
    var _c = 0;
    var timer = setInterval(function(){
        if(_c>10){
            clearInterval(timer);
            _c=0;
            userFlag = 0;
        }else{
            console.log("杀死广告");
            killAd();
            _c++;
        }
    },600);
}
//CSDN
function csdn(){
	var o = [".meau-list","header","#csdn-toolbar","aside",".comment-box",".recommend-box",".t0",".related-article",
	".article-bar-bottom",".meau-gotop-box","#pic_container",".answer-box","#_kfgdmxteyi",".pic_container"];
	removeAds(o);
}
//博客园
function cnblogs(){
	var o = ["#header","#sideBar","#MySignature","#blog_post_info_block",".postDesc","#comment_form","#footer","#blog-comments-placeholder"];
	removeAds(o);
}
//百度
function baidu(){
	var $normal_ads = $("span:contains('广告')");
	var $brand_ads = $("a:contains('广告')");
	function removeItem(v){
        var $this = $(v);
        var i=0;
        while($this.parent().attr('id')!=='content_left'&&i<10){
            $this = $this.parent();
            i++;
        }
        $this.fadeOut(1200);
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