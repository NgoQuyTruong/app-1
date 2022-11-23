class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.string :post_id
      t.string :user_id
      t.integer :vote_type
      t.timestamps
    end
  end
end
