class AddDefaultValueOfPost < ActiveRecord::Migration[5.2]
  def change
    change_column :posts, :vote_point, :integer, default: 0
  end
end
