class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user

  def index
    organization_id = OrganizationsUser.where(user_id: current_user.id, default_organization: true)[0].organization_id
    organization = Organization.find(organization_id)
    locations = organization.locations
    render json: { status: :ok, locations: locations}
  end

  def create
  end

  private

  def render_post_response(location)
    if location.save
      render json: { status: :ok, message: "SUCCESS"}
    else
      render json: { status: :unprocessable_entity, message: location.errors }
    end
  end

  def location_params
      params.require(:location).permit(:name)
  end

end
