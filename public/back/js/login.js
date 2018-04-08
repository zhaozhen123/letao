;(function () {

    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                //字段规则
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 12,
                        message: "密码长度必须在6-12位之间"
                    },
                    callback: {
                        message: "用户民错误"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须在6-12位之间"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }

    })

    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/employee/employeeLogin',
            dataType: 'json',
            type: 'POST',
            data: $("#form").serialize(),
            success: function (info) {
                console.log(info);
                if (info.success) {
                    location.href = "index.html"
                }
                if (info.error === 1001) {
                    $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
                }
                if (info.error === 1000) {
                    $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
                }
            }
        })
    });


    $("[type='reset']").on("click", function () {
        console.log("123");
        $("#form").data("bootstrapValidator").resetForm()
    })




})();