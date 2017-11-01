class CreateOrgSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :org_sessions do |t|
      t.string :name
      t.string :description
      t.date :start_date
      t.date :end_date
      t.belongs_to :organization

      t.timestamps
    end
  end
end
