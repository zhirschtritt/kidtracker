class Api::V1::EventsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user

  def index
    events = Event.organization_events(current_user)
    render json: events
  end

  def create
    binding.pry
    kid_id = event_params(:kid_id)
    location_id = event_params(:location_id)
    new_event = Event.new(kid_id: kid_id, location_id: location_id)
    if new_event.save
      render json: new_event
    else
      render json: new_event.errors
    end
  end

  private

  def event_params

    params.permit(:kid_id, :location_id)
  end

end
