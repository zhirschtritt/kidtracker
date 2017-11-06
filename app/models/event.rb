class Event < ApplicationRecord
  belongs_to :kid
  belongs_to :location

  def self.new_event(kid_id, location_id)
    Event.create!(kid_id: kid_id, location_id: location_id)
    Kid.find(kid_id).update(location_id: location_id)
  end

  def self.organization_events(current_user)
    organization = Organization.default_organization(current_user)
    locations = organization.locations
    return locations.map do |location|
      Event.all.where(location_id: location.id)
    end
  end

end
