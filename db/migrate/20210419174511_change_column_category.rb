class ChangeColumnCategory < ActiveRecord::Migration[5.2]
  def change
    rename_column :categories, :name_category, :name
  end
end
