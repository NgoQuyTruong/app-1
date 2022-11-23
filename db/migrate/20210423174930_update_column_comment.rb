class UpdateColumnComment < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :permalink, :string
  end
end
