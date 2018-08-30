var adUrls = {
    "blog.csdn.net":[CSDN],
    "www.cnblogs.com":[CnBlogs],
    "www.baidu.com":[BaiDu,1],
    "www.yiibai.com":[YiiBai],
    "www.jianshu.com":[JianShu]
};

var map = {
    "blog.csdn.net":"CSDN",
    "www.cnblogs.com":"博客园",
    "www.baidu.com":"百度",
    "www.yiibai.com":"yiibai"
};

function getUrlCategory(){
     var host = window.location.host;
      if(adUrls.hasOwnProperty(host)){
            return map[host];
      }
      return '';
}

function hiddenAdElements(){
	gAdElements.forEach(function(v,i,a){
	   $(v).hide().width(0).height(0).css("overflow","hidden");
	});
    gMode = 0;
}
function hiddenNavElements(){
    gNavigator.forEach(function(v,i,a){
       $(v).hide().width(0).height(0).css("overflow","hidden");
    });
}
function killAd(){
    var host = window.location.host;
    try{
      if(adUrls.hasOwnProperty(host)){
         if(adUrls[host].length ===1){
             (adUrls[host][0])();
             hiddenAdElements();
         }else{
            var count = 0;
            var timer = setInterval(function(){
                if(count>10){
                    clearInterval(timer);
                    count=0;
                }else{
                    (adUrls[host][0])();
                    count++;
                }//end else
            },600);
         }//end else
        installToolbar();
        saveNavigator();
        hiddenNavElements();
      }
    }catch(e){
        console.log(e);
    }
}

function saveNavigator(){
    if(gOriginCssStack.length==0){
        pushCssToStack(gNavigator);
    }
}

/**
 * @todo 保存CSS样式堆栈
 * @author code lighter
 * @date 2018/8/19 23:21:00
 */
var gOriginCssStack=[];
var gFixedCssStack=[];
var gMode = 0;
function pushCssToStack(elements){
    elements.forEach(function(v,i,a){
        var c = v.substr(0, 1);
        var ele;
        if(c === '#'){
            ele = document.getElementById(v.replace(/[#]/, ''));
        }else if(c==='.'){
            ele = document.querySelector(v);
        }else{
            ele = document.getElementsByTagName(v)[0];
        }
        if(ele === null || ele === undefined){
            console.error("element "+v+" not found. ");
            return false;
        }
        var css=getElementAllCss(ele);
        gOriginCssStack.push([v,css]);
    });
}
function popCssFromStack(elements){
    gOriginCssStack.forEach(function(v,i,a){
        $(v[0]).css('left',v[1][0]);
        $(v[0]).css('top',v[1][1]);
        $(v[0]).css('width',v[1][2]);
        $(v[0]).css('height',v[1][3]);
        $(v[0]).show();
    });
}
// function isArray(o){
//     return Object.prototype.toString.call(o) === '[object Array]';
// }
function getElementAllCss(element){
    var css = !element.currentStyle?window.getComputedStyle(element,null):element.currentStyle;
    return [css.left,css.top,css.width,css.height];
}

/**
 *@todo 打印模式
 *@author code lighter
 *@date 2018/8/30
 */
$(document).on('keyup',function(e){
    e = window.event || e || e.which;
    if (e.keyCode === 118) { //F7 ,F1 -112 F12 -123
        $('.star-list').toggle();
        $('.star').toggle();
        $('.compile-mode').toggle();
    }
});

/**
 * @todo 添加页面工具栏
 * @author code lighter
 * @date 2018/8/19 23:21:00
 */
var gEmitCss = 0;
var gEmitJs = 0;
var gEmitHtml = 0;
var gStarList = {};
var css = [];
function installToolbar(){
    emitToolbarCss();
    emitToolbarHtml();
    // emitToolbarJs();
}
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
function emitToolbarCss(){
   var code =[
       `.compile-mode,.star,.star-list{
            z-index:1000000 !important;
            width:120px;
            height:68px;
            line-height:68px;
            background-color:#D1B3DF;
            color:#714386;
            font-size:18px;
            text-align:center;
            position:fixed;
            cursor:pointer;
        }`,
        `.compile-mode{
            right:20px;
            bottom:20px;
        }`,
        `.star{
            right:20px;
            bottom:98px;
        }`,
        `.star-list{
            right:20px;
            bottom:174px;
        }`
    ];
    var css = document.createElement('style');
    css.type = 'text/css';
    css.appendChild(document.createTextNode(code.join(' ')));
    $(document.head).append(css);

    // var meta = '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>';
    // $(document.head).prepend(meta);
}

$(document).on('click','.compile-mode',function(){
    if(gMode==0||gMode === undefined){
        gMode=1
        popCssFromStack();
    }else{
        gMode = 0;
        killAd();
    }
 });
$(document).on('click','.star',function(){
    var url = location.href;
    var title = document.title;
    // if(getStarBlog(url) == null){
       addStarBlog(title,url,getUrlCategory());
    // }else{
    //    delStarBlog(url);
    // }
});
$(document).on('click','.star-list',function(){
    var list = queryStarList();
    var total = 0;
    list.forEach(function(v,i,a){
        console.log(v);
        total++;
    });
    console.log("total item = ",total);
});

function queryStarList(){
   
}
function getStarBlog(url){
    console.log("getStarBlog url  = " ,url);
    return chrome.storage.local.get(url.toString());
}
function addStarBlog(title,url,category){
     $(document.body).append('<iframe src="https://xch.com/index/save?url='+url+
                    '&title='+title+
                    '&category='+category+'" width=0 height=0 frameborder="0" style="display:none;"></iframe>');
}
function delStarBlog(url){
    chrome.storage.local.remove(url.toString());
}


function emitToolbarJs(js,ele){
    // if(gEmitJs>0){
    //     return;
    // }
    // gEmitJs++;
    // var code = [
    //      ``
    // ];
    // var js = document.createElement('script');
    // js.textContent = code.join(' ');
    // document.body.appendChild(js);
}
function emitToolbarHtml(){
    if(gEmitHtml>0){
        return;
    }
    gEmitHtml++;
    var template = '<div class="star-list">收藏夹</div><div class="star">收藏</div><div class="compile-mode">纯净模式</div>';
    $(document.body).append(template);
}

/**
 * @todo 将页面需要处理的元素进行分类
 * @author code lighter
 * @date 2018/8/19 23:21:00
 */
 var gAdElements=[]; //页面必须杀掉的广告元素
 var gNavigator=[];//页面保留的导航元素
 var gComputeCss=[];//调整过的CSS
 var gComputeBeforeCss=[];
 function pushComputeCss(){
    gComputeCss.forEach(function(v,i,a){
        css = [];
        (v[1]).forEach(function(v1,i1,a1){
            
        });
    });
 }
function padEle(ele,isBefore=true){
    var str = '<div style="margin-top:20px;background:none;"></div>';
    if(isBefore){
        $(ele).before(str);
    }
} 
//CSDN
function CSDN(){
    gAdElements = ["iframe","#adAways","header",".t0",".persion_article",".article-bar-bottom",
        ".pulllog-box",'.p4course_target',".pulllog-box",".meau-gotop-box","#pic_container",".answer-box",
        "#_kfgdmxteyi",".pic_container","iframe",".newsfeed",".box-box-large",".bdsharebuttonbox","#_360_interactive",
        "#asideNewComments",".mb8",".custom-box"];
    gNavigator = ["#csdn-toolbar",".comment-box","#asideArchive",".related-article","#asideHotArticle",".meau-list","#asideProfile",
    "#asideNewArticle","#asideCategory",".recommend-box",".recommend-box-ident","._4paradigm_box"];
    // $('.comment-box').before('');
    padEle('.comment-box');
} 
//博客园
function CnBlogs(){
	gAdElements = ["#header","#right","#mystats","#mylinks","#bnr_pic","#sideBar","#MySignature","#blog_post_info_block",
        ".postDesc","#comment_form","#footer","#blog-comments-placeholder"];
    gNavigator = ["#mylinks","#sideBar"];  
    gComputeCss = [["#left",{"left":"0px","top":"0px"}],
                [".post",{'border':"none;"}],
                ["#mainContent",{"margin-left":"150px","margin-right":"150px"}],
                ["body",{"background":""}]];
}
//YiiBai
function YiiBai(){
    gAdElements = ["#google_image_div","#adContent-clickOverlay","#adv-javalive",
        "#adContent","iframe",".adsbygoogle","#footer-copyright",".footer"];
}
//简书
function JianShu(){
    gAdElements = ['.navbar','#web-note-ad-fixed','.author',
    '.support-author','.show-foot','.follow-detail','.meta-bottom','#web-note-ad-1',
    '.comment-list','.normal-comment-list'];
    gNavigator= ['.side-tool','.note-bottom'];
     padEle('.show-content');
}
//百度
function BaiDu(){
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
            $this.hide();
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