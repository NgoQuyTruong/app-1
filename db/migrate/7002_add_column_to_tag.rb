class AddColumnToTag < ActiveRecord::Migration[6.1]
  def change
    add_column :tags, :permalink, :string
  end
end
