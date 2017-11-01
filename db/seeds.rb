# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

OrgSession.create!(
  name: "Things that Move",
  start_date: Date.parse('2018-07-14'),
  end_date: Date.parse('2018-07-24'),
  organization: Organization.find(1)
  )
OrgSession.create!(
  name: "Life: Natural and Artificial",
  start_date: Date.parse('2018-07-25'),
  end_date: Date.parse('2018-08-05'),
  organization: Organization.find(1)
  )
OrgSession.create!(
  name: "Imaginary Worlds",
  start_date: Date.parse('2018-08-06'),
  end_date: Date.parse('2018-08-16'),
  organization: Organization.find(1)
  )

30.times do
  Kid.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    dob: Faker::Business.credit_card_expiry_date-5000
  )
end

for kid in Kid.all
  SessionRoster.create!(
    org_session: OrgSession.all.sample,
    kid: kid
  )
end

100.times do
  Event.create!(
    location: Location.where(organization_id: 1).sample,
    kid: Kid.all.sample
  )
end
