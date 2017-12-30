class Connection < ApplicationRecord
  belongs_to :airport_a, class_name: "Airport"
  belongs_to :airport_b, class_name: "Airport"

  default_scope { includes(:airport_a, :airport_b) }
end
