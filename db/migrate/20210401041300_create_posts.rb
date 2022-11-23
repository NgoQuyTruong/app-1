class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :body
      t.boolean :visible
      t.string :peralink
      t.integer :author_id
      t.integer :views
      t.timestamps
    end
  end
end
