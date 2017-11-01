class Organization < ApplicationRecord
  has_many :locations
  has_many :organizations_users
  has_many :users, through: :organizations_users
  has_many :org_sessions

  def self.current_selected(user_id)
    OrganizationsUser.where(
      user_id: user_id,
      default_organization: true
    )[0].organization
  end

end
