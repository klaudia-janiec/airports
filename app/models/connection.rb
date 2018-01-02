class Connection < ApplicationRecord
  belongs_to :airport_a, class_name: "Airport"
  belongs_to :airport_b, class_name: "Airport"

  validates :airport_a, uniqueness: { scope: :airport_b }

  default_scope { includes(:airport_a, :airport_b) }
end
