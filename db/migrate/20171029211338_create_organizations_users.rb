class CreateOrganizationsUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :organizations_users do |t|
      t.belongs_to :user,         null: false
      t.belongs_to :organization, null: false

      t.timestamps
    end
  end
end
