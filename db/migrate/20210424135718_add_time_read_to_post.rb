class AddTimeReadToPost < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :readtime, :string 
  end
end
