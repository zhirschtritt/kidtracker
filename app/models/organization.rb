class Organization < ApplicationRecord
  has_many :orgs_users
  has_many :users, through: :organizations_users

end
