class PostController < ApplicationController
    def index
        
        @q = policy_scope(Post).ransack(params[:q])
        # @list_category = @search.result.order(position: :asc)
        @posts = @q.result.visible.order(created_at: :desc).page(params[:page]).per(10)
        @posts_viewest = @q.result.visible.order(views: :desc).limit(5)
        respond_to do |format|
            format.html # index.html.erb
            format.json { render json: @posts }
            format.js 
        end
    end

    def show
        @search = policy_scope(Category).ransack(params[:q])
        @list_category = @search.result.order(position: :asc)
        
        @q = Post.friendly.ransack(params[:q])
        # @list_category = @search.result.order(position: :asc)
        @posts = @q.result.visible.order(created_at: :desc).page(params[:page]).per(10)
        @post = Post.friendly.find(params[:id])
        @point_vote = @post.votes.up_vote.count - @post.votes.down_vote.count
        @post_vote_check = current_user.present? ? @post.votes.find_by_user_id(current_user.id) : nil
        respond_to do |format|
            format.html # index.html.erb
            format.json { render json: @posts }
            format.js 
        end
    
        # Post.find(13).comments.count
    end
    def update
        @post = Post.friendly.find params[:id]
        
        current_views = @post.views;
         @post.update(views: current_views+1)
       
           # redirect_to admin_posts_path
    
    end

    
end
