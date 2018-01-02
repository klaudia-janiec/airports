class Connection < ApplicationRecord
  belongs_to :airport_a, class_name: "Airport"
  belongs_to :airport_b, class_name: "Airport"

  validates :airport_a, uniqueness: { scope: :airport_b }
  validate  :different_airports

  default_scope { includes(:airport_a, :airport_b) }

  private

  def different_airports
    errors.add(:base, :different_airports) if airport_a&.id == airport_b&.id
  end
end
