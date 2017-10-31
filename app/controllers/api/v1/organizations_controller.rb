class Api::V1::OrganizationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user

  def index
    user = User.find(current_user.id)
    organizations = user.organizations
    render json: organizations
  end

  def create
    organization = Organization.new(organization_params)
    render_post_response(organization)
  end

  def select
    user = User.find(current_user.id)
    organization = Organization.find(params[:organization_id])
    user.organization_id = organization.id
    if user.save
      render json: { status: :ok, selected_organization_id: organization.id }
    else
      render json: { status: :unprocessable_entity, message: user.errors }
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
