;(function(){

    var id = getSearch("id");

    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:{
            id:id
        },
        success:function(info){
            console.log(info);
            $(".mui-scroll").html(template("brandId",info));


            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            mui('.mui-numbox').numbox()

        }
    });
    $(".lt_content").on("click",".lt_size span",function () {
        $(this).addClass("current").siblings().removeClass("current")
    });

    // 添加购物车功能
    $(".go-cart").on("click",function(){

        var size = $(".lt_content .lt_size .current").text();
        var num = $(".mui-numbox input").val();

        if( !size){
            mui.toast('请选择尺码');
            return
        }


        $.ajax({
            url:' /cart/addCart',
            type:'POST',
            data:{
                productId:id,
                num:num,
                size:size
            },
            success:function(info){
                console.log(info);
                if(info.error ===400){
                    location.href = "login.html?retUrl="+location.href;
                }
                if(info.success){
                    mui.confirm('温馨提示','继续浏览',['去购物车','继续浏览'],function(e){
                        if(e.index === 0){
                            location.href = "cart.html";
                        }
                    })
                }
            }
        })
    })
})();