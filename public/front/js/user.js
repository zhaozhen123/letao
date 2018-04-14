;(function(){
    $.ajax({
        url:'/user/queryUserMessage',
        type:'get',
        success:function(info){
            console.log(info);
            if(info.error){
                location.href="login.html";
                return;
            }
            $(".userInfo").html(template("tmp",info))
        }
    })
    $("#logoutBtn").on("click",function(){
        console.log("123");
        $.ajax({
            url:'/user/logout',
            type:'get',
            success:function (info) {
                if(info.success){
                   location.href="login.html"
                }
            }
        })
    })

})();