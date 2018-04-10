mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条
});

var gallery = mui('.mui-slider');
gallery.slider({
    interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
});


function getSearch(key) {
    // 获取地址栏的信息
    var search = location.search;
    // 讲地址栏的URL码解码成中文
    search = decodeURI(search);
    // 去除截取?
    search = search.slice(1);
    // 截取&后面的字符串
    var arr = search.split("&");

    var obj = {};
    arr.forEach(function (v,i) {
        var k = v.split("=")[0];
        var v = v.split("=")[1];
        obj[k] = v;
    });
    return obj[key]
}