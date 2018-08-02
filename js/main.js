//CSDN广告
var csdn = [".meau-list","header","#csdn-toolbar","aside",".comment-box",".recommend-box",".t0",".related-article",
".article-bar-bottom",".meau-gotop-box","#pic_container",".answer-box","#_kfgdmxteyi",".pic_container"];
csdn.forEach(function(v,i,a){
	$(v).hide().width(0).height(0).css("overflow","hidden");
});
//博客园广告
var cnblog = ["#header","#sideBar","#MySignature","#blog_post_info_block",".postDesc","#comment_form","#footer","#blog-comments-placeholder"];
cnblog.forEach(function(v,i,a){
	$(v).hide().width(0).height(0).css("overflow","hidden");
});
//百度广告
$("#content_left>div:last").remove();
var $baidu_ads = $("span:contains('广告')");
$baidu_ads.each(function(i,v){
	var $this = $(v);
	while($this.parent().attr('id')!='content_left'){
		$this = $this.parent();
	}
	$this.remove();
});