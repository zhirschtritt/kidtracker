class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user

  def index
    organization = Organization.default_organization(current_user)
    locations = organization.locations

    render json: locations.order('name')
  end

  def create
    new_location = Location.new(
      name: location_params[:name],
      organization_id: Organization.default_organization(current_user).id
    )
    if new_location.save
      render json: {status: :ok, location: new_location}
    else
      render json: { status: :unprocessable_entity, message: new_location.errors }
    end
  end

  def destroy
    Location.destroy(params[:id])
    render json: {message: "Deleted location with id: #{params[:id]}"}
  end

  private


  def location_params
      params.require(:location).permit(:name, :id)
  end

end
