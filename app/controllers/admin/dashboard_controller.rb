
module Admin
    class DashboardController < AdminController
        def index
            @count_post =  policy_scope(Post).count
            
            @post_of_today = policy_scope(Post).where("created_at >= ? ", Time.zone.now.beginning_of_day).count
            
        end
    end    
end