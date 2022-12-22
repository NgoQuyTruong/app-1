class DialogInfoUser {
    constructor(class_hover = '.show-info-user') {
        this.class_hover = class_hover;
        this.url_get_info = '';
        this.cache_data = {};
        this.flag_create_popup = false;
    }

    init() {
        this.handleHover();
    }

    handleHover() {
        let self = this;
        // bind event client hover user name
        $(document).on("mouseenter",self.class_hover, function(){
            $(this).css('color', 'blue')
            // check cache data
            // ton tai roi => hien ra
            // chua co thi hien dialog loading
            // get data
            // hien ra
            let current_id = $(this).data().idUser
           // console.log(current_id);
            self.processPopup(this);
            self.hoverEvent(current_id);
        } )
        // $(self.class_hover).mouseenter(function() {
        //     $(this).css('color', 'blue')
        //     // check cache data
        //     // ton tai roi => hien ra
        //     // chua co thi hien dialog loading
        //     // get data
        //     // hien ra
        //     let current_id = $(this).data().idUser

        //     self.processPopup(this);
        //     self.hoverEvent(current_id);
        // })


        $('body').mousemove(function(e) {
            //console.log(e)
            if($(e.target).closest(self.class_hover + ', .dialog-user-info').length == 0) {
                self.hidePopup();
            }
            
        })

    }
    processPopup(target) {
        // check popup and show popup
        !this.flag_create_popup && this.createPopup()

        // show popup
        this.progressPosition($(target))
        this.showPopup();
    }

    async hoverEvent(target_id) {
        let data;
        // check data cache
        // phai biet id hover
        if(this.cache_data[target_id] === undefined) {
            // hien thi loading animation
            this.popup.html(this.tenmplateLoading());
            // get data
            data = await this.getData(target_id);
            // cache data 
            this.cache_data[data.id] = data;

        }else {
            data = this.cache_data[target_id]
        }
        // xu ly vs thang data
        this.processData(data);
        
    }
    progressPosition(target) {
        this.popup.removeClass('on-top on-bottom')
        let window_height = $(window).height();
        let offset = target.offset()
        let offset_viewport_top = target.offset().top - $(window).scrollTop()


        if(window_height/2 > offset_viewport_top) {
            //console.log(offset.top + target.innerHeight() + 10)
            // hien o duoi
            this.popup.css('top', offset.top + target.innerHeight() + 10);
            this.popup.addClass('on-bottom');


        }else {
            //  hien o tren
            this.popup.css('top', offset.top);
            this.popup.addClass('on-top');

        }

        this.popup.css('left', offset.left);

    }
    hidePopup() {
        if(this.popup){
            this.popup.removeClass('active');
        }
       
    }
    showPopup() {
        // hien thi len = cach add class active
        this.popup.addClass('active');
    }

    processData(data) {
        let html_data = this.tenmplateUserInfo(data);

        this.popup.html(html_data)

        if(!data.mine && data.status_login) {
            this.bindFollowActions(data.user_data.id)
        }
    }

    bindFollowActions(id) {
        let self = this;
        this.popup.find('.btn-follow').click(function() {
            $.ajax({
                url: `/authors/${id}/create_friendship`,
                data: {
                    authenticity_token: AUTH_TOKEN
                },
                type: 'POST',
                dataType: 'json',
            }).done(function (data) {
                self.cache_data[id] = data
                self.processData(data);

            }).fail(function () {
                let mess = "Cập nhật thất bại";
                notiFail(mess)
            })
        })
        this.popup.find('.btn-unfollow').click(function() {
            $.ajax({
                url: `/authors/${id}/destroy_friendship`,
                data: {
                    authenticity_token: AUTH_TOKEN
                },
                type: 'POST',
                dataType: 'json',
            }).done(function (data) {
                self.cache_data[id] = data
                self.processData(data);

            }).fail(function () {
                let mess = "Cập nhật thất bại";
                notiFail(mess)
            })
        })
    }

    tenmplateUserInfo(data) {
        let user_data = data.user_data
        let actions = '';
        if(!data.mine) {
            actions = this.htmlActions(data);
        }
        return (`
            <div >
                <div class="d-flex align-items-center">
                    <div>
                        ${this.checkAvatar(data)}
                    </div>
                    <div class="ml-2">
                        <h5 class="text-left mb-0"><a href="/authors/${user_data.id}">${user_data.name}</a></h5>
                        <p class="mb-0">${user_data.email}</p>
                        <div class="d-flex">
                            <div class="mr-3">
                                <span class="mdi mdi-pencil"></span>
                                <span>${user_data.posts_count}</span>
                            </div>
                            <div class="mr-3">
                                <span class="mdi mdi-account-multiple-plus"></span>
                                <span>${user_data.followers_count}</span>
                            </div>
                        </div>
                    </div>
                </div>
                ${actions}
            </div>
        `)
       
    }
    checkAvatar(data){
        if(data.avatar){
            return(`
                <img src="${data.avatar_url}" class="avatar">
            `)
        }
        return(`
                <img src="/images/default-avatar.png" class="avatar">
            `)
    }
    htmlActions(data) {
        return(`
            <hr class="my-1"/>
            <div class="d-flex align-items-center justify-content-between py-2">
                <div>
                    <!--  -->
                </div>
                <div>
                    ${ !data.status_login ? this.renderLinkLogin() : this.renderFollowActions(data.status_follow, data.user_data?.id) }
                </div>
            </div>
        `)
    }
    renderLinkLogin() {
        return (`
            <a href="users/sign_in" class="btn btn-outline-primary btn-sm">Theo dõi</a>
        `)
    }

    renderFollowActions(follow_status, user_id) {
      console.log('user_id', user_id);
        if(follow_status) {
            return (`
                <button class="btn btn-outline-primary btn-sm btn-unfollow">Hủy theo dõi</button>
                <button class="btn btn-outline-primary btn-sm btn-chat" data-user="${user_id}">Trò Chuyện</button>

            `)
        }
        return (`
            <button class="btn btn-outline-primary btn-sm btn-follow">Theo dõi</button>
        `)
    }

    getData(id) {
        return $.ajax({
            url: '/authors/' + id,
            dataType: 'json',
            type: 'GET'
        })

    }
    createPopup() {
        this.flag_create_popup = true;

        this.popup = $(this.templatePopup())
        // tao popup
        $('body').append(this.popup);
    }

    tenmplateLoading() {
        return (`
            <i class="mdi mdi-spin mdi-loading"></i>
        `)
    }

    templatePopup() {
        return (`
            <div class="dialog-user-info">
                
            </div>
        `)
    }
}

$(function() {
    new DialogInfoUser().init()
})