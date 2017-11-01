class Api::V1::OrganizationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user

  def index
    organizations = current_user.organizations
    default_organization = OrganizationsUser.where(
      user_id: current_user.id,
      default_organization: true)[0].organization

    render json: {
      status: :ok,
      organizations: organizations,
      default_organization: default_organization
    }
  end

  def create
    organization = Organization.new(organization_params)
    render_post_response(organization)
  end

  def select
    user_id = current_user.id
    organization_id = params[:organization_id]

    #ENCAPSULATE THE BELOW LOGIC IN INSTANCE METHOD
    # OrganizationsUser.update_default_org(user_id: user_id, organization_id: organization_id)

    orgs_users = OrganizationsUser.where(user_id: user_id)

    orgs_users.each do |org_user|
      if org_user.organization_id == organization_id
        OrganizationsUser.update(org_user.id, default_organization: true)
      else
        OrganizationsUser.update(org_user.id, default_organization: false)
      end
    end
    org_id = OrganizationsUser.where(
      user_id: user_id,
      default_organization: true)[0].organization_id

    if org_id == organization_id
      render json: { status: :ok, selected_organization_id: org_id }
    else
      render json: { status: :unprocessable_entity, message: organizations_users.errors }
    end
  end

  private

  def render_post_response(organization)
    if organization.save
      OrganizationsUser.create!(user: current_user, organization: organization)
      render json: { status: :ok, message: "SUCCESS"}
    else
      render json: { status: :unprocessable_entity, message: vote.errors }
    end
  end

  def organization_params
      params.require(:organization).permit(:name, :description)
  end

end
