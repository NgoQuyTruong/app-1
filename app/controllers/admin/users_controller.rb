
module Admin
    class UsersController < AdminController
        def index     
            #    //creat,update,destroy,show,index,new,
            @search = policy_scope(User).ransack(params[:q])

            
            @users = @search.result.order(created_at: :desc).page(params[:page]).per(5)
            
             @user = User.friendly.find(current_user.id)
            # 
            
            #  @post  = Post.new
            respond_to do |format|
                format.html # index.html.erb
                format.json { render json: @posts }
                format.js 
            end

        end

        def show
            @user = User.friendly.find(params[:id])
        end

        def edit   
            # @post = Post.find(params[:id]) 
            #find sẽ bắn ra một Exception nếu không có bất kỳ một record nào được tìm thấy -> web bị crash
            @user = User.friendly.find(params[:id]) 

            authorize @user
        end

        def edit_password
            @user = User.friendly.find(current_user.id)
            #each qua list_category -> find category_id end update
           
            # params[:category].each do |id, new_position| 
            #     @category = Category.find_by_id(id)
            #     @category.update(position: new_position) 
               
            # end

           
            #     respond_to do |format|
            #         format.json {render :json => {mes: "Cập nhật thành công"}} # index.html.erb
            #     end
          


            
        end

        def edit_profile
            if params[:id].nil?
                @user = User.friendly.find(current_user.id)
            else 
                @user = User.friendly.find(params[:id])
            end
        end

        def  update 
            @user = User.friendly.find(params[:id])
           
            authorize @user
            if @user.update(user_params)
                # @post.save
                # redirect_to admin_posts_path
                 flash[:notice] = "Cập nhật thành công"
                 redirect_to admin_users_path
            else
                
                flash[:alert] = @user.errors.full_messages.join(". ")
                render :edit
            end
           
             
        end

        def user_params
            params.require(:user).permit(:name, :nickname, :birthday, :address, :phone, :avatar, :role, :slug)
        end
    end    
end