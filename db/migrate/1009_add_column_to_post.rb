class AddColumnToPost < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :vote_point, :integer
  end
end
