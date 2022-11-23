class AddColumnToTag < ActiveRecord::Migration[5.2]
  def change
    add_column :tags, :permalink, :string
  end
end
