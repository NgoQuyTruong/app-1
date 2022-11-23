// console.log("aaaaa")
var el = document.getElementById('items');
if(el != null){
    var sortable = Sortable.create(el, {
        swapThreshold: 1,
        animation: 150,
        handle: ".btn-drag",
        ghostClass: "ghost-item",
        onUpdate: function ( /**Event*/ evt) {
            updatePosition()
        }
    });
    // call update  upposition el
    function updatePosition() {
        let list_category = $(".category-items");
        let json_category = {};
        list_category.each(function (index, element) {
            json_category[$(element).attr("data-id")] = index + 1;
        })
        // console.log(json_category);
        ajaxUpdatePosition(json_category)
    }
    // ajax update positon
    function ajaxUpdatePosition(data) {
        
        $.ajax({
            url: "/admin/categories/update_position",
            data: {
                authenticity_token: AUTH_TOKEN,
                category: data,
            },
            type: 'POST',
            dataType: 'json',
    
        }).done(function (data) {
            notiSuccess(data.mes)
            
        }).fail(function () {
            let mess = "Cập nhật thất bại";
            notiFail(mess)
        })
    }
    
}

//call selec2
$('.select2').select2({multiple: true})

$('.title_category, .peralink_category, .slug_category').keyup(function () {
    let input = $(this).val();
    let remove_unicode = removeVietnameseTones(input)
    let final_permalink = get_permalink(remove_unicode)
    $(".peralink_category").val(final_permalink)
    $(".slug_category").val(final_permalink)
});

//search post in category
// let time_out_search_p;
// $(".search_post_of_category").keyup(function () {
//     let key_word = $(this).val();
//     let cate_id = $(".page-title-box").attr("data-category-id");
//     console.log(cate_id)
//     clearTimeout(time_out_search)
//     time_out_search_p = setTimeout(() => {
//         // call api
//         $.ajax({
//             url: "/admin/categories/",
//             data: {
//                 q: {
//                     title_cont: key_word
//                 },
//                 authenticity_token: AUTH_TOKEN
//             },
//             type: 'GET',
//             dataType: 'script',
//         })
//     }, 600);
// })