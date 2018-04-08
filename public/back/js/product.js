;(function(){
    var currentPage = 1;
    // 一页多少条
    var pageSize = 5;

    render();
    function render(){
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success:function(info){
                console.log(info);
                $(".lt_content tbody").html(template("tmp",info))


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



    $(".lt_content .classify").on("click",function(){
        $("#productutModal").modal("show");

        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                $(".dropdown-menu").html(template("tmp1",info))
            }
        })
    });


    $(".dropdown-menu").on("click","a",function(){
        var text = $(this).text();
        $("#dropdownText").text(text);
        var id = $(this).data("id");
        $('[name="categoryId"]').val(id)

        $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID")
    })


    $("#fileupload").fileupload({
        dataType:"json",
        done:function (e, data) {
            console.log(data);
            var picAddr = data.result.picAddr;

            $("#imgBox img").attr("src",picAddr);

            $('[name="brandLogo"]').val(picAddr);

            $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID")            
        }
    });


    //验证表单

    $("#form").bootstrapValidator({

        excluded:[],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            brandName: {
                validators:{
                    notEmpty:{
                        message:"请输入二级分类名"
                    }
                }
            },

            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类名"
                    }
                }
            },

            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
            
        }
    })

$("#form").on("success.form.bv",function(e){
    e.preventDefault()

    $.ajax({
        url: '/category/addSecondCategory',
        type:"post",
        data:$("#form").serialize(),
        success:function(info){
            console.log(info)

             $("#productutModal").modal("hide");
             $("#form").data("bootstrapValidator").resetForm(true)
             currentPage = 1;
             render();
             $("#dropdownText").text("请选择一级分类名称");
               $("#imgBox img").attr("src", "images/none.png");
        }
    })

})


})();