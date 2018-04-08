;(function () {


    $(document).ajaxStart(function () {
        // console.log(22);
        NProgress.start();
    });
    $(document).ajaxStop(function () {
        // console.log(333);
        setTimeout(function () {
            NProgress.done();
        }, 1000);
    });


    //获取当前地址栏内有没有login.html判断当前是不是在登陆页面
    if (location.href.indexOf("login.html") === -1) {
        // console.log(11);
        //如果不在登陆页面则发送ajax请求验证
        $.ajax({
            url: '/employee/checkRootLogin',
            type: 'get',
            success: function (info) {
                console.log(info);
                if (info.success) {

                }
                if (info.error === 400) {
                    location.href = "login.html"
                }
            }
        })
    }


    $(".category").on("click", function () {
        $(this).next().stop().slideToggle()
    });


    $(".icon_bn").on("click", function () {
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_right").toggleClass("hidemenu");
        $(".lt_main").toggleClass("hidemenu");
    });

    $(".icon_exit").on("click", function () {
        $("#logoutModal").modal('toggle');
    });

    $("#logoutBtn").on("click", function () {
        // console.log("123")
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'GET',
            dataType: 'json',
            success: function (info) {
                if (info.success) {
                    location.href = "login.html"
                }
            }
        })
    });


})();