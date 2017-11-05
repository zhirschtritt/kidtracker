class Api::V1::KidsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user

  def index
    kids = Organization.default_organization(current_user).kids.order('first_name')
    render json: kids
  end

  def create

  end

  private

end
