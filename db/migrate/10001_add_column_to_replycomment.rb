class AddColumnToReplycomment < ActiveRecord::Migration[6.1]
  def change
    add_column :replycomments, :comment_id, :integer
  end
end
