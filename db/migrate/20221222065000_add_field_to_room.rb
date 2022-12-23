class AddFieldToRoom < ActiveRecord::Migration[6.1]
  def change
    add_column :rooms, :user_list, :string, array: true, default: []
  end
end
