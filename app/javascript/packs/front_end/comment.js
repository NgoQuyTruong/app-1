// gửi comment
    $(document).on('click', '.post-comment',function(){
        let new_comment = $("#textarea").val()
        let post_id = $(".post-body").attr("data-post-id")
        // console.log(new_comment);
        console.log("1234");
        $.ajax({
            url: `/post/${post_id}/comments`,
            data: {
                comment: {
                    body: new_comment,
                    post_id: post_id
                },
                authenticity_token: AUTH_TOKEN
            },
            type: 'POST',
            dataType: 'script',
        }).done(function (data) {
            $("#textarea").val("")
            $(".post-comment").addClass("btn-disabled")
            $(".post-comment").attr("disabled",true);
            console.log(data);
        }).fail(function () {
            let mess = "Cập nhật thất bại";
            notiFail(mess)
        })
    })

function notiSuccess(mess){
    toastr["success"](mess);
}

function notiFail(mess){
    toastr["error"](mess);
}

$("#textarea").keyup(function(){
    let comment_body = $(this).val();
   
    console.log(comment_body);
    if(comment_body == ""){
        $(".post-comment").attr("disabled",true);  
    }else{
        $(".post-comment").attr("disabled",false);
        $(".post-comment").removeClass("btn-disabled")
    }
     
})

// xóa comment
$(document).on('click','.delete-comment',function(e){
    let el = $(this)
    let post_id_del = $(".post-body").attr("data-post-id")
    let comment_id_del = $(".comment-items").attr("data-comment-id")
    e.preventDefault();
    console.log(123);
    $.ajax({
        url: `/post/${post_id_del}/comments/${comment_id_del}`,
        data: {
            comment: {
                comment_id_del: comment_id_del,
                post_id_del: post_id_del
            },
            authenticity_token: AUTH_TOKEN
        },
        type: 'DELETE',
        dataType: 'json',
    }).done(function (data) {
        let comment_remove = el.closest("div.comment-items")
        console.log(comment_remove);
        comment_remove.css('background','tomato');
        comment_remove.fadeOut(800,function(){
           $(this).remove();
        });
        notiSuccess(data.mes)
    }).fail(function () {
        let mess = "Cập nhật thất bại";
        notiFail(mess)
    })
})

// chỉnh sửa comemnt

    $("#list-comment").on('click', '.edit-comment', function(e){
        console.log(e);
        console.log(e.currentTarget);
        console.log(this);
        let el = $(this)
        let post_id_edit = $(".post-body").attr("data-post-id")
        let comment_id_edit = $(".comment-items").attr("data-comment-id")
        let new_comment =  $(this).closest("div.body-comment").find("p.this-comment").text()
        e.preventDefault();
        console.log(new_comment);
        $(this).closest("div.body-comment").removeClass("d-flex").addClass("d-none")
        // $(this).closest("div.comment-items").find(".form-edit-comment").removeClass("d-none")
        $(this).closest("div.comment-items").find(".form-edit-comment").append(`
        
                <div class=" w-100">
                    <textarea  class="form-control body-edit-comment" maxlength="225" rows="3" placeholder="This textarea has a limit of 225 chars."></textarea>
            </div>
            <div class="d-flex">
                    <button class="btn btn-info my-4 mx-2 cancel-comment btn-light " >Hủy</button>
                <button class="btn btn-info my-4 mx-2 save-comment btn-disabled " >Lưu</button>
            </div>                        
        `).removeClass("d-none")
        $(".body-edit-comment").val(new_comment)
        $(".cancel-comment").on('click',function(){
            $("div.body-comment").addClass("d-flex").removeClass("d-none")
            $(".form-edit-comment").find('div').remove()
        })
        $(".save-comment").on('click',function(){
            console.log("send");
            let body_edit_comment = $(".body-edit-comment").val()
            console.log(body_edit_comment);
                $.ajax({
                    url: `/post/${post_id_edit}/comments/${comment_id_edit}`,
                    data: {
                        comment: {
                            post_id: post_id_edit,
                            comment_id_edit:comment_id_edit,
                            body: body_edit_comment
                        },
                        authenticity_token: AUTH_TOKEN
                    },
                    type: 'PATCH',
                    dataType: 'script',
                }).done(function (data) {
                    let mess = "Cập nhật thành công";
                    notiSuccess(mess)
                }).fail(function () {
                    let mess = "Cập nhật thất bại";
                    notiFail(mess)
                })
         })

    })
    //rep comment

    $(document).on("click",".toggle-repcomment",function(e){
        e.preventDefault();
       // console.log(123);
       // $(".comment-form").toggle()
       $(this).closest(".current-comment").find(".time-ago").append(replycomment_form())
       validate_form()
    })


    function replycomment_form(){
        return(`
                <div class="d-block media py-2 border-bottom comment-form">
                <div class="mt-3 d-flex w-100">
                <div class="flex-grow-1">
                
                        <textarea id="repcommet-body" class="form-control" maxlength="225" rows="3" placeholder="This textarea has a limit of 225 chars."></textarea>
                </div>
            </div>
            <button class="btn btn-info mt-4 post-repcomment btn-disabled " disabled = true >Gửi câu trả lời</button>
        </div>
        `)
    }
    function validate_form(){
        
        $("#repcommet-body").keyup(function(){
           // console.log("zo");
            let comment_body = $(this).val();
           
            console.log(comment_body);
            if(comment_body == ""){
                $(".post-repcomment").attr("disabled",true);  
            }else{
                $(".post-repcomment").attr("disabled",false);
                $(".post-repcomment").removeClass("btn-disabled")
            }
             
        })
    }
    $(document).on("click",".post-repcomment",function(){
        //console.log(123);
        let post_id = $(".post-body").attr("data-post-id")
        let comment_id = $(this).closest(".comment-items").attr("data-comment-id")
        let rep_comment = $("#repcommet-body").val()
        console.log(rep_comment);
        $.ajax({
            url: `/post/${post_id}/comments/${comment_id}/rep_comment`,
            data: {
                repcomment: {
                    body: rep_comment,
                    comment_id: comment_id,
                    post_id: post_id
                },
                authenticity_token: AUTH_TOKEN
            },
            type: 'POST',
            dataType: 'script',
        }).done(function (data) {
            $("#textarea").val("")
            $(".post-repcomment").addClass("btn-disabled")
            $(".post-repcomment").attr("disabled",true); 
        }).fail(function () {
            let mess = "Cập nhật thất bại";
            notiFail(mess)
        })
    })