;(function () {

    $(".affirm").on("click", function () {
        var username = $("[type='text']").val();
        var password = $("[type='password']").val();

        if(!username){
            mui.toast('请输入用户名');
            return
        }
        if(!password){
            mui.toast('请输入密码');
            return
        }



        $.ajax({
            url: ' /user/login',
            type: 'POST',
            data: {
                username:username,
                password:password
            },
            success:function(info){
                console.log(info);
                if(info.error === 403){
                    mui.toast('用户名或者密码错误')
                }
                if(info.success){
                    if(location.href.indexOf("retUrl") !==-1){
                        location.href = location.search.replace("?retUrl=", "")

                    }else{
                        location.href="user.html"
                    }
                }
            }
        })
    })


})();