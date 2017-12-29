class Airport < ApplicationRecord
  has_many :outcoming_connections, foreign_key: :airport_a_id, class_name: "Connection"
  has_many :incoming_connections, foreign_key: :airport_b_id, class_name: "Connection"

  has_many :out_connected_airports, through: :outcoming_connections, source: :airport_b, foreign_key: :airport_a_id
  has_many :in_connected_airports,  through: :incoming_connections, source: :airport_a, foreign_key: :airport_b_id

  validates :name, :country, :y, :x, :elevation, presence: true

  def to_s
    [icao, city, country].compact.join(" ")
  end
end
