Rails.application.routes.draw do
  root to: 'home#index'

  get 'auth/google_oauth2/callback', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'


  namespace :api do
    namespace :v1 do
      get 'organizations' => 'organizations#index'
      post 'organizations' => 'organizations#create'
      patch 'organizations/select' => 'organizations#select'
      get 'locations' => 'locations#index'
      post 'locations' => 'locations#create'
    end
  end

  get '*unmatched_route', to: 'home#index'
end
