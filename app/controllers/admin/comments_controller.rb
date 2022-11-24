module Admin
    class CommentsController < AdminController
        def index
            @search = policy_scope(Comment).ransack(params[:q])

            
            @comments = @search.result.order(created_at: :asc).page(params[:page]).per(5)
            # 
            #  @post  = Post.new
            respond_to do |format|
                format.html # index.html.erb
                format.json { render json: @comments }
                format.js 
            end
        end

        def new     
            # @search = policy_scope(Post).ransack(params[:q])

            # @posts = @search.result.page(params[:page]).per(5)
            #    //creat,update,destroy,show,index,new,
            @comment  = Comment.new
            
        end
        
        def create
            @comment = Comment.new(comment_params)
            @comment.user_id = current_user.id
            @post_id = params[:comment][:post_id]
            if  @comment.save
                # @this_comment = Post.find(@post_id).comments.last
                # @this_user = Post.find(@post_id).comments.last.user
                @list_comments_of_post = Post.find(@post_id).comments
                respond_to do |format|
                    format.js 
                    # format.json {render :json => {mes: "Gửi bình luận thành công",this_comment: @this_comment, this_user: @this_user }} # index.html.erb
                end
            end
        end
        def edit    
            @search = policy_scope(Comment).ransack(params[:q])
    
            @comments = @search.result.page(params[:page]).per(5)
            
            # @post = Post.find(params[:id]) 
            #find sẽ bắn ra một Exception nếu không có bất kỳ một record nào được tìm thấy -> web bị crash
            @comment = Comment.friendly.find(params[:id])
           
            authorize @comment
        end
    
        def  update  
            #    //creat,update,destroy,show,index,new,
            # @posts = Post.find(params[:id])
            @comment = Comment.friendly.find(params[:id])
            authorize @comment
            if @comment.update(post_params)
                # @post.save
                # redirect_to admin_posts_path
                redirect_to admin_comments_path
            else
                flash[:alert] = @comment.errors.full_messages.join(". ")
                render :edit
            end 
        end
    
        def destroy     
            #    //creat,update,destroy,show,index,new,
            @comment = Comment.friendly.find(params[:id])
            authorize @comment
            @comment.destroy
            redirect_to admin_comments_path
        end
        
        def comment_params
            params.require(:comment).permit(:body, :post_id)
        end
    end

  
end