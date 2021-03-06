class Api::V1::SessionRostersController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user

  def index
    current_session_id = params[:id]
    roster = OrgSession.find(current_session_id).kids
    render json: { status: :ok, roster: roster}
  end

  private

  def org_session_params
    require(:org_sessions).permit(:id)
  end

end
