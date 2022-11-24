
//= require_tree .
require("packs/front_end/post")
require("packs/front_end/comment")
require("packs/front_end/search")
require("packs/front_end/dialog_info_user")

$(document).on("click", "[data-method]",function(e){
    let url = $(this).attr("href");
    let method = $(this).attr("data-method");
    e.preventDefault();
    $.ajax({
       url: url,
       type: method,
       data: {
        authenticity_token: AUTH_TOKEN
       },
       dataType: 'json',

       success: function(){
         location.reload();
       } 
    })
})
