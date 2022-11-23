class CreatePostCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :post_categories do |t|
      t.string :post_id
      t.string :category_id
      t.timestamps
    end
  end
end
