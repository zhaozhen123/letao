;(function(){

    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },1000);
    });


    $(".category").on("click",function(){
        $(this).next().stop().slideToggle()
    });


    $(".icon_bn").on("click",function () {
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_right").toggleClass("hidemenu");
        $(".lt_main").toggleClass("hidemenu");
    });

    $(".icon_exit").on("click",function(){
        $("#logoutModal").modal('toggle');
    });

    $("#logoutBtn").on("click",function(){
        // console.log("123")
        $.ajax({
            url:'/employee/employeeLogout',
            type:'GET',
            dataType:'json',
            success:function(info){
                if(info.success){
                    location.href = "login.html"
                }
            }
        })
    });



})();