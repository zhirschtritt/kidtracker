class SessionRoster < ApplicationRecord
  belongs_to :kid
  belongs_to :org_session

  validates :kid, presence: true
  validates :org_session, presence: true
end
