class Kid < ApplicationRecord
  has_many :events
  has_many :locations, through: :events

  def current_location
    last_event = Event.find_by(kid_id: id)
    Location.find(last_event.id)
  end

end
