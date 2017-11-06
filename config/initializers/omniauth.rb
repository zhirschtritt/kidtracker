Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV["GOOGLE_CLIENT_ID"], ENV["GOOGLE_CLIENT_SECRET"]
  {
  name: 'google',
  scope: 'email, profile',
  prompt: 'select_account',
  image_aspect_ratio: 'square',
  image_size: 100
}
end

OmniAuth.config.full_host = Rails.env.production? ? 'https://kidtracker.herokuapp.com' : 'http://localhost:3000'
