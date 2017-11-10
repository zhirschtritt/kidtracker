class RemoveNullEventTable < ActiveRecord::Migration[5.1]
  def change
    change_column_null(:events, :location_id, true)
  end
end
