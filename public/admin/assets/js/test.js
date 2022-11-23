
  var title = $("#post-title").val();
  var body = $(".summernote").text();

  var new_post = {
      title: title,
      body: body,
      peralink: '',
      view: 10
  };

$('.new-post').on("click",function(){
    $.ajax({
        method: "POST",
        url: '/admin/posts/',
        dataType: 'json',
        data:new_post
       
    }).done(function(data) {
        console.log(data)
    })
})

