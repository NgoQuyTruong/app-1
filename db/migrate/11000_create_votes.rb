class CreateVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :votes do |t|
      t.integer :post_id
      t.integer :user_id
      t.integer :vote_type
      t.timestamps
    end
  end
end
