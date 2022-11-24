class ApplicationController < ActionController::Base
    include Pundit
    protect_from_forgery
    before_action :fetch_notifications

    layout "front_end"
    # before_action :authenticate_user!
    
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
   
    def user_not_authorized(exception)
        flash[:alert] = "Bạn không có quyền này!!!."
        redirect_to admin_root_path
    end
    
    def fetch_notifications
      @notification = PostNotification.where(user_id: current_user.id)
    end
      
end
