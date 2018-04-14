;(function () {
    var key = getSearch("key");
    $('.lt_search input').val(key);

    //请求页数
    var currentPage = 1;
    //每页请求数据的多少
    var pageSize = 4;


    // render();


    $(".lt_search .seek").on("click", function () {
        render();

        var history = localStorage.getItem("search") || "[]";
        var arr = JSON.parse(history);

        var text = $(".lt_search [type='text']").val().trim();
        if (text === "") {
            mui.toast("请输入搜索关键字");
            return
        }

        if (arr.indexOf(text) !== -1) {
            var index = arr.indexOf(text);
            arr.splice(index, 1);
        }
        if (arr.length > 10) {
            arr.pop()
        }

        arr.unshift(text);
        localStorage.setItem("search", JSON.stringify(arr));
        render();
        $(".lt_search [type='text']").val("");

    });

    function render(callback) {

        var params = {};
        params.proName = $('.lt_search input').val();
        params.page = currentPage;
        params.pageSize = pageSize;


        var $current = $(".lt_sort .current");

        if ($current.length > 0) {
            var sortName = $current.data("type");
            console.log(sortName);
            var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
            console.log(sortValue);
            params[sortName] = sortValue;

        }

        setTimeout(function () {
            $.ajax({
                url: '/product/queryProduct',
                type: 'GET',
                data: params,
                success: function (info) {
                    console.log(info);
                    callback(info)
                }
            })
        }, 500)
    }


    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                callback: function () {
                    currentPage = 1;
                    render(function (info) {
                        // 渲染第一页
                        $(".lt_product").html(template("searchTpl", info));
                        // 手动结束下拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

                        //重新启用下拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();

                    });

                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                callback: function () {
                    currentPage++;
                    render(function (info) {
                        if (info.data.length > 0) {
                            // 向上拉动每次添加加载数据
                            $(".lt_product").append(template("searchTpl", info));
                            // 手动结束下拉刷新
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                        } else {
                            //重新启用下拉刷新
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        }
                    });
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });



    // 切换颜色
    $(".lt_sort a[data-type]").on("tap", function () {
        console.log("123");
        if ($(this).hasClass("current")) {
            $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up")
        } else {
            $(this).addClass("current").siblings().removeClass("current");
            $(".lt_sort a").find("i").removeClass("fa-angle-up").addClass("fa-angle-down")
        }
        render(function(info){
            $(".lt_product").html(template("searchTpl", info));
            //重新启用下拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
            // 手动结束下拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        })
    });


})();