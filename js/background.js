chrome.contextMenus.create({
    title: "火箭博客",
    onclick: function(){alert('火箭博客');},
	documentUrlPatterns: ['https://blog.csdn.net/*','https://www.cnblogs.com/*'] // 只在某些页面显示此右键菜单
});