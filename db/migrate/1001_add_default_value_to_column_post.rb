class AddDefaultValueToColumnPost < ActiveRecord::Migration[6.1]
  def change
    change_column :posts, :views, :integer, default: 0
  end
end
