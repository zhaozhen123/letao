;(function(){
  $.ajax({
      url:'/category/queryTopCategory',
      type:'GET',
      success:function(info){
        console.log(info);
          $(".category_left ul").html(template("tmp",info));

          render( info.rows[0].id );
      }
  });

  $(".category_left").on("click","a",function () {

      var id = $(this).data("id");
      render(id);
      $(this).addClass("current1").parent().siblings().find("a").removeClass("current1")

  });

    function render(id){
        $.ajax({
            url:"/category/querySecondCategory",
            type:'GET',
            data:{
                id:id
            },
            success:function(info){
                console.log(info);
                $(".category_right ul").html(template("tmp1",info))
            }
        })
    }


    



})()