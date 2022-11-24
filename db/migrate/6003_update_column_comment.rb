class UpdateColumnComment < ActiveRecord::Migration[6.1]
  def change
    add_column :comments, :permalink, :string
  end
end
