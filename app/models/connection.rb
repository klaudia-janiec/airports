class Connection < ApplicationRecord
  belongs_to :airport_a, class_name: "Airport"
  belongs_to :airport_b, class_name: "Airport"
end
