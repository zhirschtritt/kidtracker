class Location < ApplicationRecord
  belongs_to :organization
  has_many :events, dependent: :destroy

  validates :name, presence: true

  def current_kid_attendance
    Kid.where(location_id: id)
  end

end
