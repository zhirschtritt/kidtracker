class CreateOrganizations < ActiveRecord::Migration[5.1]
  def change
    create_table :organizations do |t|
      t.string :name, null: false
      t.string :description
      t.string :picture
      t.index  :name, unique: true

      t.timestamps
    end
  end
end
