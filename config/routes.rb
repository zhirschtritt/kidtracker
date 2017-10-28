Rails.application.routes.draw do
  root                               to: 'home#index'
  get 'auth/google_oauth2/callback', to: 'sessions#create'
  get 'auth/failure',                to:  root_path
  get 'logout',                      to: 'sessions#destroy'

  get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
