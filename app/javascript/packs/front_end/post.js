$(".only-tittle").click(function(event){
    event.preventDefault()
    $(".summary").addClass("d-none")
})

$(".with-summary").click(function(event){
    event.preventDefault()
    $(".summary").removeClass("d-none")
})

let flag = 0;
$(document).scroll(function(){
    let position = window.pageYOffset
    let currenoffset = $("#post-for-category").offset()
    if(currenoffset){
        let postposition = currenoffset.top - 200
      //  console.log(position);
      //  console.log(postposition);
        if(position > 280){
            if(flag == 0){
                $(".avatar-user").removeClass("d-none")
                $(".post-action").addClass("fixed-left")
                
            }
            flag = 1;
        }
        // if(position > 435 ){
        //     if(flag == 1){
        //         $(".list-posts-views").removeClass("sticky-top-custom")
        //         flag = 0 ;
        //     }
        // }
        if(position < 280 || position > postposition - 250){
            if(flag == 1){
                $(".avatar-user").addClass("d-none")
                $(".post-action").removeClass("fixed-left")
                flag = 0 ;
            }
        }
    }

})

 let readtime = $(".read-time").attr("data-read-time");
 let post_id = $(".post-body").attr("data-post-id");
 if(readtime){
    setTimeout(function(){
        console.log(readtime*60*1000);
        $.ajax({
            url: `/post/${post_id}`,
            data: {
                id: post_id,
                authenticity_token: AUTH_TOKEN,
            },
            type: 'PATCH',
            dataType: 'json',
        })
     },5000)
 }
 
 let login = $(".post-action").attr("data-login") 
 console.log(login);
 if(login === "false"){
     console.log(123);
     $(".click-to-upVote").addClass("disabled")
     $(".click-to-downVote, .share-to-fb, .share-to-tw, .show-action").addClass("disabled")
    $(".post-action").attr("data-toggle","tooltip").attr("data-placement","right").attr("data-original-title","Đăng nhập để tương tác")
    
 }
 //up_vote
 $(document).on("click",".click-to-upVote",function(e){   
    e.preventDefault();
    let post_id = $(".post-body").attr("data-post-id");
    let voted = $("#post-content").attr("data-status-voted")
    console.log(voted);
    if(voted){
        //cập nhật
        console.log("cập nhật");
        $.ajax({
            url: `/post/${post_id}/vote/${post_id}`,
            data: {
                post_id: post_id,
                vote_type: "up_vote",
                authenticity_token: AUTH_TOKEN,
            },
            type: 'PATCH',
            dataType: 'script'
        }).done(function (data) {
            console.log(data);
        }).fail(function () {
            let mess = "Cập nhật thất bại";
            notiFail(mess)
        })
    }else{
        //tạo mới
        console.log("tạo mới");
        $.ajax({
            url: `/post/${post_id}/vote`,
            data: {
                vote: {
                    post_id: post_id,
                    vote_type: "up_vote",
                },
                authenticity_token: AUTH_TOKEN,
            },
            type: 'POST',
            dataType: 'script'
        }).done(function (data) {
            console.log(data);
        })
    }
})

$(document).on("click",".click-to-downVote",function(e){  
    e.preventDefault();
    let post_id = $(".post-body").attr("data-post-id");
    let voted = $("#post-content").attr("data-status-voted")
    console.log(voted);
    if(voted){
        //cập nhật
        console.log("cập nhật");
        $.ajax({
            url: `/post/${post_id}/vote/${post_id}`,
            data: {
                post_id: post_id,
                vote_type: "down_vote",
                authenticity_token: AUTH_TOKEN,
               
            },
            type: 'PATCH',
            dataType: 'script'
        }).done(function (data) {
            console.log(data);
        })
    }else{
        //tạo mới
        console.log("tạo mới");
        $.ajax({
            url: `/post/${post_id}/vote`,
            data: {
                vote: {
                    post_id: post_id,
                    vote_type: "down_vote",
                },
                authenticity_token: AUTH_TOKEN,
            },
            type: 'POST',
            dataType: 'script'
        }).done(function (data) {
            console.log(data);
        })
    }
})

$(document).on('click', ".notification-item", function (e) {
  e.preventDefault();
  const notification_id = $(this).data('notification');
  const self = this;
  console.log(notification_id);
  $.ajax({
    url: `/post/view_notification`,
    data: {
      notification_id: notification_id,  
      authenticity_token: AUTH_TOKEN,
      },
    type: 'post',
    dataType: 'script'
    }).done(function (data) {
        console.log($(self));
        window.location.href = self.href
    })
})