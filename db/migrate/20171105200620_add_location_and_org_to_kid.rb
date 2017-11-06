class AddLocationAndOrgToKid < ActiveRecord::Migration[5.1]
  def change
    add_reference :kids, :location, foreign_key: true
    add_reference :kids, :organization, foreign_key: true, null: false
  end
end
