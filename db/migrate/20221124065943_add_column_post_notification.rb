class AddColumnPostNotification < ActiveRecord::Migration[6.1]
  def change
    add_column :post_notifications, :from_user, :integer
    add_column :post_notifications, :type, :string
  end
end
