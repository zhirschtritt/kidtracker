class Api::V1::OrgSessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user

  def index
    current_organization = Organization.default_organization(current_user)
    org_sessions = OrgSession.where(
      organization: current_organization)
    render json: { status: :ok, org_sessions: org_sessions}
  end

end
