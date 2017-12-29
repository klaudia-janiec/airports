class CreateConnections < ActiveRecord::Migration[5.1]
  def change
    create_table :connections do |t|
      t.bigint :airport_a_id, null: false, index: true
      t.bigint :airport_b_id, null: false, index: true
    end

    add_foreign_key :connections, :airports, column: :airport_a_id
    add_foreign_key :connections, :airports, column: :airport_b_id
    add_index :connections, [:airport_a_id, :airport_b_id]
  end
end
