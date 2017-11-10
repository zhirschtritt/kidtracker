require 'date'

class Kid < ApplicationRecord
  has_many :events, dependent: :destroy
  belongs_to :location, optional: true

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :dob, presence: true


  def as_json(options={})
    options[:methods] = [:age,:current_location,:full_name, :location_updated_at]
    super
  end

  def age
    now = Date.today
    now.year - dob.year - ((now.month > dob.month || (now.month == dob.month && now.day >= dob.day)) ? 0 : 1)
  end

  def current_location
    return Location.find(location_id) if !location_id.nil?
    return nil
  end

  def full_name
    [first_name, last_name].join(" ")
  end

end
