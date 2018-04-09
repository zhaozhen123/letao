;(function () {
    var pageOne = 1;
    var pageSize = 5;
    var picArr = [];

    render();

    function render() {

        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: pageOne,
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
                        pageOne = page;
                        render()
                    },
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "next":
                                return '下一页';
                            case "prev":
                                return "上一页";
                            case 'last':
                                return '尾页';
                            case 'first':
                                return '首页';
                            default :
                                return page;
                        }
                    },
                    tooltipTitles: function (type, page, current) {
                        switch (type) {
                            case "next":
                                return '下一页';
                            case "prev":
                                return "上一页";
                            case 'last':
                                return '尾页';
                            case 'first':
                                return '首页';
                            default :
                                return "前往第" + page + "页";
                        }
                    },
                    useBootstrapTooltip: true,
                });
            }
        })
    }

    // 打开模态框
    $(".classify").on("click", function () {
        $("#productutModal").modal("show")
    })

    // 渲染模态框的数据
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (info) {
            $(".dropdown-menu").html(template("tmp1", info))
        }
    });
    // 下拉框注册点击事件选择分类渲染到按钮上显示
    $(".dropdown-menu").on("click", "a", function () {

        var txt = $(this).text();

        var id = $(this).data("id");

        $("#dropdownText").text(txt);

        $(".categoryId").val(id);

        $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID")
    });

    // 上传图片
    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            // 获取图片对象
            var picObj = data.result;
            // 获取图片地址
            var picAddr = picObj.picAddr;
            picArr.unshift(picObj);
            $("#imgBox").prepend('<img src="' + picAddr + '"  width="100" height="100">');

            if (picArr.length > 3) {
                // 找到数组第一项删除他
                picArr.pop();
                // 找到渲染的图片的第一项删除图片
                $("#imgBox img:last-of-type").remove();
            }
            if (picArr.length === 3) {
                $("#form").data("bootstrapValidator").updateStatus("picStatus", "VALID")
            }
        }
    })

    $("#form").bootstrapValidator({

        excluded: [],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },

            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式, 必须是非零开头的数字'
                    }
                }
            },

            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码(32-40)'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 32-40'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品价格'
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: '请上传三张图片'
                    }
                }
            },
        }
    })

    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();

        var params = $("#form").serialize();
        params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
        params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
        params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;

        $.ajax({
            url:'/product/addProduct',
            type:'POST',
            data:'params',
            success:function(info){
                console.log(info);
                if(info.success){
                    $("#productutModal").modal("hide");
                    pageOne = 1;
                    render();
                    $("form").data("bootstrapValidator").resetForm(true);
                    picArr = [];
                    $("#dropdownText").text("请选择二级分类");
                    $("#imgBox img").remove()
                }
            }
        })
    })


})();









