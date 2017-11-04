class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :kids, serializer: KidSerializer

  def kids
    Location.find(self.object.id).current_kid_attendance
  end

end
