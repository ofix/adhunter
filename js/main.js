//CSDN
var csdn = [".meau-list","header","#csdn-toolbar","aside",".comment-box",".recommend-box",".t0",".related-article",
".article-bar-bottom",".meau-gotop-box","#pic_container",".answer-box","#_kfgdmxteyi",".pic_container"];
csdn.forEach(function(v,i,a){
	$(v).hide().width(0).height(0).css("overflow","hidden");
});
//博客园
var cnblog = ["#header","#sideBar","#MySignature","#blog_post_info_block",".postDesc","#comment_form","#footer","#blog-comments-placeholder"];
cnblog.forEach(function(v,i,a){
	$(v).hide().width(0).height(0).css("overflow","hidden");
});
console.log("我执行了一个扩展JS代码");