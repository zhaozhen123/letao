;(function () {
    var key = getSearch("key");
    $('.lt_search input').val(key);


    render();


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
        render()
        $(".lt_search [type='text']").val("");

    });


    // 切换颜色
    $(".lt_sort a[data-type]").on("click", function () {
        if ($(this).hasClass("current")) {
            $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up")
        } else {
            $(this).addClass("current").siblings().removeClass("current");
            $(".lt_sort a").find("i").removeClass("fa-angle-up").addClass("fa-angle-down")
        }
        render()
    });


    function render() {

        var params = {};
        params.proName = $('.lt_search input').val();
        params.page = 1;
        params.pageSize = 100;


        var $current = $(".lt_sort .current");

        if ($current.length > 0) {
            var sortName = $current.data("type");
            console.log(sortName);
            var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
            console.log(sortValue);
            params[sortName] = sortValue;

        }

        setTimeout(function(){
            $.ajax({
                url: '/product/queryProduct',
                type: 'GET',
                data: params,
                success: function (info) {
                    $(".lt_product").html(template("searchTpl", info))
                }
            })
        },500)
    }

})();