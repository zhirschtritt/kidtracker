class KidSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :avatar, :age, :current_location


  def age
    Kid.find(self.object.id).age
  end

  def current_location
    Kid.find(self.object.id).current_location
  end

end
