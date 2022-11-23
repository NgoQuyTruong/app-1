$('.title_tag, .peralink_tag, .slug_tag').keyup(function () {
    let input = $(this).val();
    console.log(input == "");
    let remove_unicode = removeVietnameseTones(input)
    let final_permalink = get_permalink(remove_unicode)
    let value = $(this).val().toLowerCase();
    $("#myList").addClass('d-none')
    if(value != ""){
        $("#myList").removeClass('d-none')
        $("#myList li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
    }
    $(".peralink_tag").val(final_permalink)
    $(".slug_tag").val(final_permalink)
   
});

$('.select2_tag').select2({
    tags: true,
    tokenSeparators: [',', ' '],
    createTag: function (params) {
        var term = $.trim(params.term);
    
        if (term === '' || term.length > 10) {
          return null;
        }
    
        return {
          id: term,
          text: term,
          newTag: true
        }
    }
})


$('.admin-form-post').submit(function(e) {

    let new_tag = [];
    $('.select2_tag [data-select2-tag="true"]:selected').each(function() {
        new_tag.push($(this).val())
    })

    // using ajax
    // 
    // create new input
    let input = $('<input name="new_tags" class="d-none">')
    input.val(new_tag.join(','))
    // push to view
    $(this).append(input)

})