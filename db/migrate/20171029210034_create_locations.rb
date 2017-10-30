class CreateLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.string     :name,        null:false
      t.string     :address
      t.string     :city
      t.string     :state
      t.string     :zip_code
      t.belongs_to :organization, null: false

      t.timestamps
    end
  end
end
