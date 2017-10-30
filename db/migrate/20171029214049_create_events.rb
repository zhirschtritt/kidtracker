class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.belongs_to :kid,      null: false
      t.belongs_to :location, null: false

      t.timestamps
    end
  end
end
