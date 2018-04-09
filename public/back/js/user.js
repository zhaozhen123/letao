;(function () {

    var currentPage = 1;
    // 一页多少条
    var pageSize = 5;

    render();

    //渲染数据ajax
    function render() {
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                $(".lt_content tbody").html(template("tmp", info));


                // 页码插件
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render()
                    }
                });
            }
        })
    }
    $(".lt_content tbody").on("click", ".btn", function () {
        // console.log("123")
        $("#userutModal").modal("show");

        var id = $(this).parent().data("id");
        var isDelete = $(this).hasClass("btn-success") ? "1" : "0";
        console.log(id);
        console.log(isDelete);

        $("#userutBtn").off("click").on("click",function(){
            // console.log("23")
            $.ajax({
                url:'/user/updateUser',
                type:'post',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(info){
                    // console.log(info);
                    if(info.success){
                        $("#userutModal").modal("hide");
                        render();
                    }
                }
            })
        })
    })


})();