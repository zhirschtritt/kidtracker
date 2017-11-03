class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user

  def user
    render json: current_user
  end

  private

end
