class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.string :name_category
      t.string :peralink
      t.text :description
      t.string :meta_title
      t.text :meta_descript
      t.string :meta_keyword
      t.timestamps
    end
  end
end
