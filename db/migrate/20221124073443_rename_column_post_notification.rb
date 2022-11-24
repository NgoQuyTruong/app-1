class RenameColumnPostNotification < ActiveRecord::Migration[6.1]
  def change
    rename_column :post_notifications, :type, :notification_type

  end
end
