class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :name, :department, :image_url
end