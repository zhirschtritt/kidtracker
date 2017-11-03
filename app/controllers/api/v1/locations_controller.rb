class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user

  def index
    organization = Organization.default_organization(current_user)
    locations = organization.locations

    render json: locations

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
