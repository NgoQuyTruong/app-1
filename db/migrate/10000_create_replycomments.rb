class CreateReplycomments < ActiveRecord::Migration[6.1]
  def change
    create_table :replycomments do |t|
      t.string :body
      t.integer :like
      t.integer :dislike
      t.timestamps
    end
  end
end
