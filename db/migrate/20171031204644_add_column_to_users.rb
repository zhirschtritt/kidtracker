class AddColumnToUsers < ActiveRecord::Migration[5.1]
  def change
    add_reference :users, :organization, index: { name: "selected_organization" }
  end
end
