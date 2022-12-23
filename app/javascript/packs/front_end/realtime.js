console.log(1111);
import io from "socket.io-client";

var socket = io("http://localhost:5001/")
console.log('connect socket successfully', socket);

$(document).on('click', '.btn-chat', function () {
  const remoteUser = $(this).data('user')
  socket.emit("create or join", remoteUser)
  $('#layout-wrapper').append(renderChatBox(remoteUser))
  console.log('remoteUser', remoteUser);
})

$(document).on('click', '.chat-send', function (e) {
  const sendToUser = $(".send-to-user").data("user-remote");
  console.log('gui tin nhan', sendToUser);
  let messeger = $(".chat-input").val()

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
    const message_data = {
      to_user_id: sendToUser,
      content: messeger
    }
    socket.emit("anybody-send-message", message_data)
    $(".chat-input").val("")
    $(".chat-conversation .simplebar-content-wrapper").scrollTop($(".chat-conversation .simplebar-content-wrapper")[0].scrollHeight);
    $(`.last-message[data-last-message='${sendToUser}']`).html(messeger)
    $(`.time-ago-mess[data-time-ago-message='${sendToUser}']`).html('now')
  }).fail(function (err) {
    console.log(err);
  })
})

$(document).on('keypress', '.chat-input', function (event) {
  const sendToUser = $(".send-to-user").data("user-remote");
  let messeger = $(".chat-input").val()
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
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
      const message_data = {
        to_user_id: sendToUser,
        content: messeger
      }
      socket.emit("anybody-send-message", message_data)
      $(".chat-input").val("")
      $(".chat-conversation .simplebar-content-wrapper").scrollTop($(".chat-conversation .simplebar-content-wrapper")[0].scrollHeight);
      $(`.last-message[data-last-message='${sendToUser}']`).html(messeger)
      $(`.time-ago-mess[data-time-ago-message='${sendToUser}']`).html('now')
    }).fail(function (err) {
      console.log(err);
    })
  }

})

socket.on("send-message-to-room", function (data) {
  let user_id = $(".send-to-user").data("user-remote");
  data.to_user_id == user_id ? $(".chat-conversation .simplebar-content").append(handlerDisplayYourMessage(data.content)) : $(".chat-conversation .simplebar-content").append(handlerDisplayGuestMessage(data.content))
  $(".chat-conversation .simplebar-content-wrapper").scrollTop($(".chat-conversation .simplebar-content-wrapper")[0].scrollHeight);
})

const handlerDisplayYourMessage = (data) => {
  const yourName = $('.your-name').data('current_user')
  return (`
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

const handlerDisplayGuestMessage = (data) => {
  const yourName = $('.your-name').data('current_user')
  return (`
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


$(function(){
  console.log('hihihi');
  $(".chat-conversation .simplebar-content-wrapper").scrollTop($(".chat-conversation .simplebar-content-wrapper")[0].scrollHeight);
})

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
