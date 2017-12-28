class Airport < ApplicationRecord
  validates :name, :country, :y, :x, :elevation, presence: true
end
