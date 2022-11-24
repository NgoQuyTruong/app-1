class ChangeColumnCategory < ActiveRecord::Migration[6.1]
  def change
    rename_column :categories, :name_category, :name
  end
end
