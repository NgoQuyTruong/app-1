class CreateChats < ActiveRecord::Migration[6.1]
  def change
    create_table :chats do |t|
      t.integer :from_user_id
      t.integer :to_user_id
      t.text :content

      t.timestamps
    end
  end
end
