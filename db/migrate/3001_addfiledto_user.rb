class AddfiledtoUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :name, :string
    add_column :users, :address, :string
    add_column :users, :phone, :integer
    add_column :users, :nickname, :string
    add_column :users, :birthday, :string
    add_column :users, :status, :string
    add_column :users, :avata, :string
  end
end
