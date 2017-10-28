require 'rails_helper'

def stub_omniauth
  # first, set OmniAuth to run in test mode
  OmniAuth.config.test_mode = true
  # then, provide a set of fake oauth data that
  # omniauth will use when a user tries to authenticate:

  OmniAuth.config.mock_auth[:google] = OmniAuth::AuthHash.new({
    provider: "google_oauth2",
    uid: "12345678910",
    info: {
      email: "zach@partsandcrafts.org",
      first_name: "Zach",
      last_name: "Hirschtritt",
      image: "https://lh3.googleusercontent.com/--ShZ3BDKU00/AAAAAAAAAAI/AAAAAAAAAAA/v4PbmULEUrY/photo.jpg"
    },
    credentials: {
      token: "abcdefg12345",
      refresh_token: "12345abcdefg",
      expires_at: DateTime.now,
    }
  })

end

RSpec.feature "user logs in" do
  scenario "using google oauth2" do
    stub_omniauth
    visit root_path
    expect(page).to have_link("Sign in with Google")
    click_link "Sign in with Google"
    expect(page).to have_content("User McUserface")
    expect(page).to have_link("Logout")
  end
end
