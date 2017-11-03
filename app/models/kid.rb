require 'date'

class Kid < ApplicationRecord
  has_many :events
  has_many :locations, through: :events
  has_many :session_rosters
  has_many :org_sessions, through: :session_rosters

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :dob, presence: true

  def current_location
    if Event.where(kid_id: id).exists?
      last_event = Event.where(["kid_id = ?", id]).last
      return last_event.location
    else
      return "NOT CHECKED IN"
    end
  end


  def age
    now = Date.today
    now.year - dob.year - ((now.month > dob.month || (now.month == dob.month && now.day >= dob.day)) ? 0 : 1)
  end
end
