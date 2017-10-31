class AddDefaultToOrgsUser < ActiveRecord::Migration[5.1]
  def change
    add_column :organizations_users, :default_organization, :boolean, default: false
  end
end
