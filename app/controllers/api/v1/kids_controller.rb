class Api::V1::KidsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user

  def index
    kids = Organization.default_organization(current_user).kids.order('first_name')
    render json: kids
  end

  def create
    kids = params[:kids][:data][1..-1]
    new_kid_count = 0
    organization_id = Organization.default_organization(current_user).id
    kids.each do |kid|
      next if kid[0] == ""
      dob = Date.strptime(kid[2],'%m/%d/%Y')
      new_kid = Kid.new(
        first_name: kid[0],
        last_name: kid[1],
        dob: dob,
        organization_id: organization_id
      )
      if new_kid.save
        new_kid_count += 1
      end
    end
    render json: {status: :ok, newKidCount: new_kid_count}
  end

  private

end
