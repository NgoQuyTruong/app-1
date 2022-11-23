class ChangeTableCategory < ActiveRecord::Migration[5.2]
  def change
    rename_column :categories, :peralink, :permalink
    add_column :categories, :position, :integer
  end
end
