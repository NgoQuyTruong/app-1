class AddSlugToCategory < ActiveRecord::Migration[6.1]
  def change
      add_column :categories, :slug, :string
      add_index  :categories, :slug
  end
end
