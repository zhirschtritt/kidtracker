class CreateSessionRosters < ActiveRecord::Migration[5.1]
  def change
    create_table :session_rosters do |t|
      t.belongs_to :kid, null: false
      t.belongs_to :org_session, null: false

      t.timestamps
    end
  end
end
