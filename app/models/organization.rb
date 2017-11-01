class Organization < ApplicationRecord
  has_many :locations
  has_many :organizations_users
  has_many :users, through: :organizations_users

end
