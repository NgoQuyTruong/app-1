class ChangeColumnOfPost < ActiveRecord::Migration[6.1]
  def change
    rename_column :posts, :peralink, :permalink
  end
end
