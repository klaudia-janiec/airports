class CreateAirports < ActiveRecord::Migration[5.1]
  def change
    create_table :airports do |t|
      t.string :name, null: false
      t.string :city
      t.string :country, null: false
      t.string :iata
      t.string :icao
      t.decimal :y, null: false, precision: 18, scale: 15
      t.decimal :x, null: false, precision: 18, scale: 15
      t.integer :elevation, null: false
    end
  end
end
