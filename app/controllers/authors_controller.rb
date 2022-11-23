class AuthorsController < ApplicationController

    def index
        @q = policy_scope(Post).ransack(params[:q])
        # @list_category = @search.result.order(position: :asc)
        @posts = @q.result.visible.order(created_at: :desc).page(params[:page]).per(10)
        
    end
    
    def show
        @q = Post.friendly.ransack(params[:q])
        # @list_category = @search.result.order(position: :asc)
        @posts = @q.result.visible.order(created_at: :desc).page(params[:page]).per(10)
        @user = User.friendly.find(params[:id])
        
        @status_login = user_signed_in?
        @follow_by_current_user = current_user.present? ? @user.follower_ids.include?(current_user.id) : false

        # is_mine post
        @mine = (current_user.present? && @user == current_user) || false
        @avatar = @user.avatar?

        #@user_test = User.friendly.find(params[:id])
        respond_to do |format|
            format.html # index.html.erb
            format.json { render :json => {
                user_data:  @user.as_json(
                    only: [:email, :name],
                    methods: [:id, :default_avatar, :posts_count, :followers_count ]
                ),
                status_login: @status_login,
                status_follow: @follow_by_current_user,
                mine: @mine,
                avatar: @avatar
            }}
        end
    end

    def create_friendship
        @follow_target = User.friendly.find(params[:id])

        @follow_target.followers << current_user
        respond_to do |format|
            format.json { render :json => {
                user_data:  @follow_target.as_json(
                    only: [:email, :name],
                    methods: [:id, :default_avatar, :posts_count, :followers_count ]
                ),
                status_login: true,
                status_follow: true,
                mine: false
            }}
        end
    end
    def destroy_friendship
        @follow_target = User.friendly.find(params[:id])

        @follow_target.friendship_followers.where(follower_id: current_user.id).destroy_all

        respond_to do |format|
            format.json { render :json => {
                user_data:  @follow_target.as_json(
                    only: [:email, :name],
                    methods: [:id, :default_avatar, :posts_count, :followers_count ]
                ),
                status_login: true,
                status_follow: false,
                mine: false
            }}
        end
    end

    def destroy
        @user_del = params[:follow][:followed_id]
        @user = User.friendly.find(params[:id])
        @follow_del = FriendShip.find_by follower_id: current_user.id, followed_id: @user_del
        p @follow_del
        if @follow_del.destroy
            respond_to do |format|
                format.json {render :json => {mes: "Đã hủy theo dõi"}} # index.html.erb
            end
        end
    end

    def follow_params
        params.require(:follow).permit(:followed_id)
    end

end
