class AddColumnToReplycommentv2 < ActiveRecord::Migration[5.2]
  def change
    add_column :replycomments, :post_id, :integer
    add_column :replycomments, :user_id, :integer
  end
end
