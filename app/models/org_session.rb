class OrgSession < ApplicationRecord
  belongs_to :organization
  has_many :session_rosters
  has_many :kids, through: :session_rosters

  validates :organization_id, presence: true
  validates :name, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true

end
