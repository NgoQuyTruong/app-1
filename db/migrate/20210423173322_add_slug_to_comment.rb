class AddSlugToComment < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :slug, :string
    add_index  :comments, :slug
  end
end
