;(function () {

    // var arr = [1, 2, 346, 5, 8, 89];
    // localStorage.setItem("search", JSON.stringify(arr));

    render();


    function getHistory() {
        var history = localStorage.getItem("search") || "[]";
        var arr = JSON.parse(history);
        return arr;
    }


    function render() {
        var arr = getHistory();
        $(".lt_history").html(template("searchTpl", {arr: arr}));
    }


    // 点击删除单个功能
    $(".lt_history").on("click", ".btn_delete", function () {
        var that = this;

        mui.confirm("你确认要删除么?", "温馨提示", ["确认", "取消"], function (e) {

            if (e.index === 0) {

                var index = $(that).data("index");

                var arr = getHistory();

                arr.splice(index, 1);

                localStorage.setItem("search", JSON.stringify(arr));
                render();
            }
        })
    });

// 通杀功能
    $(".lt_history").on("click", ".btn_Pass", function () {

        mui.confirm("是否清除所有历史记录", "温馨提示", ["确认", "取消"], function (e) {
            console.log(e.index);
            if (e.index === 0) {

                localStorage.removeItem("search");
                render();
            }
        })
    })


    // 功能4: 添加功能
    // 1. 点击搜索按钮, 获取输入框的值
    // 2. 获取数组
    // 3. 将输入框的值, 添加到数组中的最前面
    // 4. 持久化到本地存储中, 修改 search_list
    // 5. 重新渲染页面

    // 需求:
    // 1. 不能重复
    // 2. 数组长度不超过 10 个

    $(".lt_search .seek").on("click", function () {
        var arr = getHistory();

        var text = $(".lt_search [type='text']").val().trim();
        if (text === "") {
            mui.toast("请输入搜索关键字");
            return
        }

        if (arr.indexOf(text) !== -1) {
            var index = arr.indexOf(text);
            arr.splice(index, 1);
        }
        if(arr.length >10){
            arr.pop()
        }

        arr.unshift(text);
        localStorage.setItem("search", JSON.stringify(arr));
        render()
        $(".lt_search [type='text']").val("");

        location.href = "searchList.html?key="+text;
    })

})();

