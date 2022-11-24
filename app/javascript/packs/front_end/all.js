
//= require_tree .

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
