//function toat sucssess
function notiSuccess(mess){
    toastr["success"](mess);
}

function notiFail(mess){
    toastr["error"](mess);
}
// display animate load 
function displayAnimateLoad(action){
    
    if(action == 'hide'){
     return   $(".wraper-animate").addClass("d-none")
    }
    $(".wraper-animate").removeClass("d-none")
}
// before ajax send
$( document ).ajaxSend(function() {
    displayAnimateLoad()
});
//  ajax send Complete
$( document ).ajaxComplete(function() {
    displayAnimateLoad('hide')
  });