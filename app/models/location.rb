class Location < ApplicationRecord
  belongs_to :organization
  has_many :events
  has_many :kids, through: :events

  validates :name, presence: true

  def current_kid_attendance
    Kid.all.select do |kid|
      kid.current_location.id == id
    end
  end
end
