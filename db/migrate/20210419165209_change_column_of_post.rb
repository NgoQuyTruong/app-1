class ChangeColumnOfPost < ActiveRecord::Migration[5.2]
  def change
    rename_column :posts, :peralink, :permalink
  end
end
