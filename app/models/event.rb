class Event < ApplicationRecord
  belongs_to :kid
  belongs_to :location, optional: true

  def as_json(options={})
    options[:methods] = [:kid_name, :location_name, :date_formatted, :time_formatted]
    super
  end

  def kid_name
    Kid.find(kid_id).full_name
  end

  def location_name
    return nil if location_id.nil?
    Location.find(location_id).name
  end

  def date_formatted
    created_at.strftime "%Y-%m-%d"
  end

  def time_formatted
    created_at.strftime "%H:%M:%S"
  end


  def self.new_event(kid_id, location_id)
    new_event = Event.new(kid_id: kid_id, location_id: location_id)
    Kid.find(kid_id).update(location_id: location_id)
    return new_event
  end

  def self.organization_events(current_user)
    organization = Organization.default_organization(current_user)
    locations = organization.locations
    return locations.map do |location|
      Event.all.where(location_id: location.id)
    end
  end

  def self.kid_events_between(kid_id, start_date, end_date)
    Event.where("kid_id = ? AND created_at > ? AND created_at < ?", kid_id, start_date, end_date)
  end

  def self.events_between()

  end

end
