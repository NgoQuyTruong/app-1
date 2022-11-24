module Admin
    class TagsController < AdminController
        def index
            @tags = Tag.all.page(params[:page]).per(100)
        end

        def new     
            # @search = policy_scope(Post).ransack(params[:q])

            # @posts = @search.result.page(params[:page]).per(5)
            #    //creat,update,destroy,show,index,new,
            @tag  = Tag.new
            @tags = Tag.all
        end
        
        def create
            @tags = Tag.all
            @tag = Tag.new(tag_params)
            # @post.title = params[:post][:title]
            # @post.body = params[:post][:body]
            # @post.peralink = params[:post][:peralink]
            # @post.visible = params[:post][:visible]
            if  @tag.save
                # categories = Category.find(params[:post][:category_ids])
                #@tag.category_ids = params[:post][:category_ids] # = categories
                redirect_to admin_tags_path
            else
                p @tag.errors.full_messages
                render :new
            end
        end
        
        def tag_params
            params.require(:tag).permit(:name,:permalink, :slug)
        end
        
    end
end