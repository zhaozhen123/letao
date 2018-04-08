;(function () {
    var currentPage = 1;
    // 一页多少条
    var pageSize = 5;

    render();

    function render() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',

            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                $(".lt_content tbody").html(template("tmp", info));


                $("#paginator1").bootstrapPaginator({
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


    $(".lt_content .classify").on("click", function () {
        $("#firstutModal").modal("show")
    });

    $("#form").bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类名"
                    }
                }
            }
        }
    })

    $('[type=submit]').on("click",function(e){
        // console.log("123")
        e.preventDefault();
        $.ajax({
            url:'/category/addTopCategory',
            type:'POST',
            data:$("#form").serialize(),
            success:function(info){
                console.log(info);
                if(info.success){
                    $("#firstutModal").modal("hide");
                    currentPage = 1;
                    render()

                    $("#form").data("bootstrapValidator").resetForm(true)
                }
            }
        })
    })




})();