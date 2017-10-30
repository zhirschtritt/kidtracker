class CreateKids < ActiveRecord::Migration[5.1]
  def change
    create_table :kids do |t|
      t.string   :first_name, null: false
      t.string   :last_name,  null: false
      t.string   :avatar
      t.date     :dob,        null: false

      t.timestamps
    end
  end
end
