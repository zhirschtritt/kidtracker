class User < ApplicationRecord
  has_many :orgs_users
  has_many :organizations, through: :organizations_users

  def self.update_or_create(auth)
    user = User.find_by(uid: auth[:uid]) || User.new
    user.attributes = {
      provider: auth[:provider],
      uid: auth[:uid],
      email: auth[:info][:email],
      first_name: auth[:info][:first_name],
      last_name: auth[:info][:last_name],
      token: auth[:credentials][:token],
      refresh_token: auth[:credentials][:refresh_token],
      oauth_expires_at: Time.at(auth[:credentials][:expires_at]),
      picture: auth[:extra][:raw_info][:picture]
    }
    user.save!
    user
  end


end
