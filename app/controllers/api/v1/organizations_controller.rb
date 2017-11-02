class Api::V1::OrganizationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user

  def index
    organizations = current_user.organizations
    default_organization = Organization.default_organization(current_user)

    render json: {
      status: :ok,
      organizations: organizations,
      default_organization: default_organization
    }
  end

  def create
    organization = Organization.new(organization_params)
    if organization.save
      OrganizationsUser.create!(user: current_user, organization: organization)
      render json: { status: :ok, message: "SUCCESS"}
    else
      render json: { status: :unprocessable_entity, message: vote.errors }
    end
  end

  def select
    organization = Organization.find(params[:organization_id])

    #ENCAPSULATE THE BELOW LOGIC IN INSTANCE METHOD

    orgs_users = OrganizationsUser.where(user_id: current_user.id)

    orgs_users.each do |org_user|
      if org_user.organization_id == organization.id
        OrganizationsUser.update(org_user.id, default_organization: true)
      else
        OrganizationsUser.update(org_user.id, default_organization: false)
      end
    end

    render json: { status: :ok, selected_organization: default_organization}
  end

  private

  def organization_params
      params.require(:organization).permit(:name, :description)
  end

end
