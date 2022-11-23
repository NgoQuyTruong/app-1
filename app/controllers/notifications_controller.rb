class NotificationsController < ApplicationController
    def index
        @notifications = Notification.find(param[:id])
        respond_to do |format|
            format.html # index.html.erb
            
        end
    end

end
