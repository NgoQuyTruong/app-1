class CreatePostTags < ActiveRecord::Migration[5.2]
  def change
    create_table :post_tags do |t|
      t.string :post_id
      t.string :tag_id
      t.timestamps
    end
  end
end
