class Organization < ApplicationRecord
  has_many :locations
  has_many :organizations_users
  has_many :users, through: :organizations_users
  has_many :org_sessions

  def self.default_organization(current_user)
    no_default_exists = OrganizationsUser.where(user_id: current_user.id, default_organization: true).empty?

    if no_default_exists
      organization_user = OrganizationsUser.where(user_id: current_user.id).first
      organization_user.update(default_organization: true)
    end

    return OrganizationsUser.where(
      user_id: current_user.id,
      default_organization: true)[0].organization
  end

end
