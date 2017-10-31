class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :authenticate_user

  def current_user
    @current_user ||= User.find(session[:id]) if session[:id]
  end

  def authenticate_user
    if current_user.nil?
      (render json: 'Bad credentials', status: 401 )
    end
  end

end
