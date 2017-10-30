class Location < ApplicationRecord
  belongs_to :organization
  has_many :events
  has_many :kids, through: :events

  validates :name, presence: true

end
