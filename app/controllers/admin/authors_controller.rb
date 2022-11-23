module Admin
    class AuthorsController < AdminController
        def index
            @q = Post.friendly.ransack(params[:q])
            @posts = @q.result.visible.order(created_at: :desc).page(params[:page]).per(10)
        end
    end    
end