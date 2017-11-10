class KidSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :full_name,
  :avatar, :age, :current_location, :updated_at

  # def age
  #   Kid.find(self.object.id).age
  # end
  #
  # def full_name
  #   Kid.find(self.object.id).full_name
  # end
  #
  # def current_location
  #   Kid.find(self.object.id).current_location
  # end

end
