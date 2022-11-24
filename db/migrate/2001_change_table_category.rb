class ChangeTableCategory < ActiveRecord::Migration[6.1]
  def change
    rename_column :categories, :peralink, :permalink
    add_column :categories, :position, :integer
  end
end
