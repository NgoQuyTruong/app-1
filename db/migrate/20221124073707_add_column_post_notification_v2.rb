class AddColumnPostNotificationV2 < ActiveRecord::Migration[6.1]
  def change
    add_column :post_notifications, :content, :text
    add_column :post_notifications, :custom_fields, :string
  end
end
