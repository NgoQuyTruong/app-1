class PostNotification < ApplicationRecord
  belongs_to :post

  def user_noti
    User.find(self.from_user)
  end
end
