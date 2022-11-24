class AddDefaultValueOfPost < ActiveRecord::Migration[6.1]
  def change
    change_column :posts, :vote_point, :integer, default: 0
  end
end
