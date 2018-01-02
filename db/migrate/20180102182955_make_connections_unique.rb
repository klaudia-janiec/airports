class MakeConnectionsUnique < ActiveRecord::Migration[5.1]
  def change
    remove_index :connections, ["airport_a_id", "airport_b_id"]
    add_index :connections, ["airport_a_id", "airport_b_id"], unique: true
  end
end
