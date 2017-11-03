class Event < ApplicationRecord
  belongs_to :kid
  belongs_to :location

  def new_event(kid_id, location_id)
    Event.create!(kid_id: kid_id, location_id: location_id)
  end

end
