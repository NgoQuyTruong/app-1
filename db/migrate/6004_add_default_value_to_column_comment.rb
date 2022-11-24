class AddDefaultValueToColumnComment < ActiveRecord::Migration[6.1]
  def change
     change_column :comments, :like, :integer, default: 0
     change_column :comments, :dislike, :integer, default: 0
  end
end
