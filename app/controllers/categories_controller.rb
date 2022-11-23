class CategoriesController < ApplicationController
   
    def index
        @search = policy_scope(Category).ransack(params[:q])
       
        @categorys = @search.result.order(position: :asc)

        @q = Post.ransack(params[:q])
        @posts = @q.result.visible.order(created_at: :desc).page(params[:page]).per(10)
        
        #  @post  = Post.new
        respond_to do |format|
            format.html # index.html.erb
            format.js 
        end
    end

    def show
        @q = Post.friendly.ransack(params[:q])
        @posts = @q.result.visible.order(created_at: :desc).page(params[:page]).per(10)

        @search = policy_scope(Category).ransack(params[:q])
       
        @categorys = @search.result.order(position: :asc)
        
        @category = Category.friendly.find(params[:id])
        @list_post_of_category = @category.posts.page(params[:page]).per(5);
        respond_to do |format|
            format.html # index.html.erb
            format.json { render json: @posts }
            format.js 
        end
        
        
        # Post.find(13).comments.count
    end
end
