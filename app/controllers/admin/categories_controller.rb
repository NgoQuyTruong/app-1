module Admin
    class CategoriesController < AdminController
        def index
   #    //creat,update,destroy,show,index,new,
            @search = policy_scope(Category).ransack(params[:q])
       
            @list_category = @search.result.order(position: :asc)
            @test = Category.last
            # 
            
            #  @post  = Post.new
            respond_to do |format|
                format.html # index.html.erb
                format.js 
            end
        end
        def new
            @category  = Category.new
        end

        def create
            @category = Category.new(category_params)
            @last_position = Category&.last&.position || 0
            @category.position = @last_position + 1;
            if  @category.save
                redirect_to admin_categories_path
            else
                render :new
            end
        end

        def edit    
            # @search = policy_scope(Category).ransack(params[:q])

            # @category = @search.result.page(params[:page]).per(5)
            
            # @post = Post.find(params[:id]) 
            #find sẽ bắn ra một Exception nếu không có bất kỳ một record nào được tìm thấy -> web bị crash
            @category = Category.friendly.find(params[:id])
        end
        def  update  
            #    //creat,update,destroy,show,index,new,
            # @posts = Post.find(params[:id])
            @category = Category.friendly.find(params[:id]) 
            authorize @category
            if @category.update(category_params)  
              redirect_to admin_categories_path
            else
  
                flash[:alert] = @post.errors.full_messages.join(". ")
                render :edit
            end
        end
        def update_position
            #each qua list_category -> find category_id end update
           
            params[:category].each do |id, new_position| 
                @category = Category.find_by_id(id)
                @category.update(position: new_position) 
               
            end

           
                respond_to do |format|
                    format.json {render :json => {mes: "Cập nhật thành công"}} # index.html.erb
                end 
        end

        def show   
            @category = Category.friendly.find(params[:id])
            @list_post_of_category = @category.posts.page(params[:page]).per(5);
        end

        def destroy     
            #    //creat,update,destroy,show,index,new,
            @category = Category.friendly.find(params[:id])
            authorize @category
            @category.destroy
            redirect_to admin_categories_path
        end

        def category_params
            params.require(:category).permit(:name, :description, :avatar, :slug)
        end
    end    
end