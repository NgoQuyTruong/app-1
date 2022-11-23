let timeOutSearch;

$("#q_title_cont").keyup(function(){
    let key_word = $(this).val();
    console.log(key_word);
    clearTimeout(timeOutSearch)
    timeOutSearch = setTimeout(function(){
        $.ajax({
            url: "/",
            data: {
                q: {
                    title_cont: key_word
                },
                authenticity_token: AUTH_TOKEN
            },
            type: 'GET',
            dataType: 'script',
        }).done(function(data){
             console.log(data)
        })
    },600)
})