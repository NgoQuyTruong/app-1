class EditPost < ActiveRecord::Migration[6.1]
  def change
    rename_column :posts, :author_id, :user_id
  end
end
