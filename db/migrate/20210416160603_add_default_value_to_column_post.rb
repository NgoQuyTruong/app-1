class AddDefaultValueToColumnPost < ActiveRecord::Migration[5.2]
  def change
    change_column :posts, :views, :integer, default: 0
  end
end
