;(function () {


    render();

    function render() {
        setTimeout(function () {
            $.ajax({
                url: ' /cart/queryCart',
                type: 'GET',
                success: function (info) {
                    console.log(info);
                    if (info.error) {
                        location.href = "login.html"
                    } else {
                        $(".mui-table-view").html(template("tmp", {obj: info}));

                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    }
                }
            })
        }, 300)

    }


    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",//下拉刷新容器标识
            down: {
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                callback: function () {
                    render();
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });


    $(".mui-table-view").on("tap", ".btn_delete", function () {
        // console.log("123")
        var id = $(this).data("id");
        mui.confirm('温馨提示', '确认删除', ['确认', '取消'], function (e) {
            if (e.index === 0) {
                $.ajax({
                    url: '/cart/deleteCart',
                    type: 'GET',
                    data: {
                        id: id
                    },
                    success: function (info) {
                        console.log(info);
                        if (info.success) {
                            // render()
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        });
    });

    $(".mui-table-view").on("tap", ".btn_edit", function () {
        var id = this.dataset.id;

        var htmlStr = template("editTpl", this.dataset);
        console.log(this.dataset);

        htmlStr = htmlStr.replace(/\n/g, '');

        mui.confirm(htmlStr, '编辑商品', ['确认', '取消'], function (e) {
            var size = $(".lt_size span.current").text();
            var num = $(".lt_num input").val();
            if (e.index === 0) {
                $.ajax({
                    url: '/cart/updateCart',
                    type: 'POST',
                    data: {
                        id: id,
                        size: size,
                        num: num
                    },
                    success: function (info) {
                        console.log(info);
                        if (info.success) {
                            // render();
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                        }
                    }
                })
            }


        });

        $("body").on("tap", ".lt_size span", function () {
            $(this).addClass("current").siblings().removeClass("current");
        });
        // 切记点击加间框每次需要初始化
        mui('.mui-numbox').numbox();
    })


    $(".mui-table-view").on("change", ".checkbox", function (e) {

        $checked = $(".checkbox:checked");

        var total = 0;
        $checked.each(function (v,i) {
            var price = $(this).data("price");
            var num = $(this).data("num");
            total += price * num;
        })

        total = total.toFixed(2);
        $(".totalPrice").text(total);

    });
})();