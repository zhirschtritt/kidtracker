# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

Organization.create!(
  name: "Parts and Crafts"
)

OrganizationsUser.create!(
  user: User.first,
  organization: Organization.first
)

Location.create!(
  name: "Main Space",
  organization: Organization.first
)
Location.create!(
  name: "Park",
  organization: Organization.first
)
Location.create!(
  name: "Ice Skating Rink",
  organization: Organization.first
)

30.times do
  Kid.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    dob: Faker::Business.credit_card_expiry_date-5000,
    organization_id: Organization.first.id,
    location: Location.where(organization_id: Organization.first.id).sample
  )
end

10.times do
  Kid.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    dob: Faker::Business.credit_card_expiry_date-5000,
    organization_id: Organization.first.id,
    location: nil
  )
end

100.times do
  Event.create!(
    location: Location.where(organization_id: Organization.first.id).sample,
    kid: Kid.all.sample
  )
end
