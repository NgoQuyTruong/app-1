class AddTimeReadToPost < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :readtime, :string 
  end
end
