import io from "socket.io-client";

var socket = io("http://localhost:5001/")
console.log('connect socket successfully', socket);

// $(".btn-chat").click(function(){

  

//   if($("#roomNumber").val() === ''){
//       alert("Please type a room name")
//   }else{
//       roomNumber = $("#roomNumber").val()
//       socket.emit("create or join", roomNumber)
//       $("#selectRoom").addClass("d-none")
//       $("#chat_room").removeClass("d-none")
//   }
// })
$(document).on('click', '.btn-chat', function() {
  const remoteUser = $(this).data('user')
  socket.emit("create or join", remoteUser)
  $('#layout-wrapper').append(renderChatBox(remoteUser))
  console.log('remoteUser', remoteUser);
})

$(document).on('click', '.chat-send', function(e) {
  const sendToUser = $(".send-to-user").data("user-remote");
  console.log('gui tin nhan', sendToUser);
  let messeger =  $(".chat-input").val()

    $.ajax({
      url: `/chat/${sendToUser}`,
      data: {
          messeger: {
                  to_user_id: sendToUser,
                  content: messeger
              },
              authenticity_token: AUTH_TOKEN
          },
          type: 'POST',
          dataType: 'script',
      }).done(function (data) {
          const message_data = {to_user_id: sendToUser, content: messeger}
          socket.emit("anybody-send-message", message_data)
          $(".chat-input").val("")
          $(".chat-conversation .simplebar-content").scrollTop($(".chat-conversation .simplebar-content")[0].scrollHeight);
      }).fail(function (err) {
          console.log(err);
      })
})

socket.on("send-message-to-room", function(data){
  let user_id =  $(".send-to-user").data("user-remote");
  data.to_user_id == user_id ? $(".chat-conversation .simplebar-content").append(handlerDisplayYourMessage(data.content)) : $(".simplebar-content").append(handlerDisplayGuestMessage(data.content))
})

const handlerDisplayYourMessage = (data) =>{
  const yourName = $('.your-name').data('current_user')
  return(`
    <li class="right">
    <div class="conversation-list">
        <div class="dropdown">

            <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="bx bx-dots-vertical-rounded"></i>
              </a>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Copy</a>
                <a class="dropdown-item" href="#">Save</a>
                <a class="dropdown-item" href="#">Forward</a>
                <a class="dropdown-item" href="#">Delete</a>
            </div>
        </div>
        <div class="ctext-wrap">
            <div class="conversation-name">${yourName}</div>
            <p>${data}</p>
            <p class="chat-time mb-0"><i class="bx bx-time-five align-middle mr-1"></i> 10:07</p>
        </div>
    </div>
  </li>
  `)
}

const handlerDisplayGuestMessage = (data) =>{
  const yourName = $('.your-name').data('current_user')
  return(`
  <li>
  <div class="conversation-list">
      <div class="dropdown">

          <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="bx bx-dots-vertical-rounded"></i>
            </a>
          <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Copy</a>
              <a class="dropdown-item" href="#">Save</a>
              <a class="dropdown-item" href="#">Forward</a>
              <a class="dropdown-item" href="#">Delete</a>
          </div>
      </div>
      <div class="ctext-wrap">
          <div class="conversation-name">${yourName}</div>
          <p>${data}</p>
          <p class="chat-time mb-0"><i class="bx bx-time-five align-middle mr-1"></i> 10:06</p>
      </div>
      
  </div>
  `)
}


// $(function(){
//   console.log('hihihi');
//   //socket.emit("hello", "xin chao")
//   $(".btn-login").click(function(e){
//       e.preventDefault()
//       socket.emit("user-login", $(".user-data").val())
//   })

//   $(".write_msg").focusin(function(){
//        let messeger = $(this).val()
//        console.log(messeger);
//       socket.emit("anybody-typinging")
//   })

//   $(".write_msg").focusout(function(){
//       // let messeger = $(this).val()
//       // console.log(messeger);
//       socket.emit("anybody-stop-typinging")
//   })

//   $(document).on('click', '.msg_send_btn', function() {
//     console.log('gui tin nhan');
//       e.preventDefault();
//       let messeger =  $(".write_msg").val()
//       socket.emit("anybody-send-message", messeger)
//       $(".write_msg").val("")
//   })

//   $('.write_msg').keypress(function(event){
//       let messeger =  $(".write_msg").val()
//       var keycode = (event.keyCode ? event.keyCode : event.which);
//       if (keycode == '13') {
//           socket.emit("anybody-send-message", messeger)
//           $(".write_msg").val("")
//       }
//   });
// })

function renderChatBox(remoteUser) {
  return (
    `<div class="mesgs">
        <div class="msg_history">
        </div>
        <div class="type_msg">
          <div class="input_msg_write">
            <input type="text" class="write_msg" placeholder="Type a message" />
            <button class="msg_send_btn" type="button"><i class="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
    `
  )
}