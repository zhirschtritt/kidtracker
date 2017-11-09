class Api::V1::EventsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user

  def index
    events = Event.organization_events(current_user)
    render json: events
  end

  def create
    kid_id = event_params[:kid_id]
    location_id = event_params[:location_id]
    new_event = Event.new_event(kid_id, location_id)
    if new_event.save
      render json: new_event
    else
      render json: new_event.errors
    end
  end

  def events_between
    kid_id = params[:kid_id]
    begin_date = Date.parse(params[:begin_date])
    end_date = Date.parse(params[:end_date])
    render json: Event.kid_events_between(kid_id, begin_date, end_date)
  end

  private

  def event_params
    params.require(:event).permit(:kid_id, :location_id, :begin_date, :end_date)
  end

end
