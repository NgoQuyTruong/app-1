
module Admin
    class PostsController < AdminController
        def index     
            #    //creat,update,destroy,show,index,new,
            @search = policy_scope(Post).ransack(params[:q])

            
            @posts = @search.result.order(created_at: :desc).page(params[:page]).per(5)
            # 
            
            #  @post  = Post.new
            respond_to do |format|
                format.html # index.html.erb
                format.json { render json: @posts }
                format.js 
            end

        end

        def show
            @posts = Post.friendly.find(params[:id])
          end

        def new     
            # @search = policy_scope(Post).ransack(params[:q])

            # @posts = @search.result.page(params[:page]).per(5)
            #    //creat,update,destroy,show,index,new,
            @post  = Post.new
            @tags = Tag.all
        end
        
        def create
            # create new tag first
            create_tag

            @post = Post.new(post_new_params)
            @post.user_id = current_user.id

            if  @post.save
                # add category
                binding.pry
                @post.category_ids = params[:post][:category_ids]
                # add tag
                @post.tag_ids = params[:post][:tag_ids]

                redirect_to admin_posts_path
            else
                render :new
            end
        end

        def edit 
            @tags = Tag.all
            @search = policy_scope(Post).ransack(params[:q])

            @posts = @search.result.page(params[:page]).per(5)
            
            # @post = Post.find(params[:id]) 
            #find sẽ bắn ra một Exception nếu không có bất kỳ một record nào được tìm thấy -> web bị crash
            @post = Post.friendly.find(params[:id]) 

            authorize @post
        end

        def  update 
            # create new tag first
            create_tag
            #    //creat,update,destroy,show,index,new,
            # @posts = Post.find(params[:id])
            @tags = Tag.all
            @post = Post.friendly.find params[:id]
            @action = "update"
            authorize @post

            if @post.update(post_params)

                redirect_to admin_posts_path
            else
                
                flash[:alert] = @post.errors.full_messages.join(". ")
                render :edit
            end   
        end

        def destroy     
            #    //creat,update,destroy,show,index,new,
            @post = Post.friendly.find(params[:id])
            authorize @post
            @post.destroy
            redirect_to admin_posts_path
        end


        def create_tag
            params[:new_tags] = params[:new_tags].split(',')
            params[:post][:tag_ids] =  params[:post][:tag_ids] - params[:new_tags]

            params[:new_tags].each do |new_tag|
                tag = Tag.create(name: new_tag)
                params[:post][:tag_ids].push(tag.id)
            end
        end
        
        def post_params
            params.require(:post).permit(:body, :title, :permalink, :slug, :visible, :category_ids => [], :tag_ids => [])
        end

        def post_new_params
            params.require(:post).permit(:body, :title, :permalink, :slug, :visible)
        end

    end
end
