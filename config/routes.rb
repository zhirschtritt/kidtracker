Rails.application.routes.draw do
  root                               to: 'home#index'
  get 'auth/google_oauth2/callback', to: 'sessions#create'
  get 'logout',                      to: 'sessions#destroy'
end
