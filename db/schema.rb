# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171228231110) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "airports", force: :cascade do |t|
    t.string "name", null: false
    t.string "city"
    t.string "country", null: false
    t.string "iata"
    t.string "icao"
    t.decimal "y", precision: 18, scale: 15, null: false
    t.decimal "x", precision: 18, scale: 15, null: false
    t.integer "elevation", null: false
  end

  create_table "connections", force: :cascade do |t|
    t.bigint "airport_a_id", null: false
    t.bigint "airport_b_id", null: false
    t.index ["airport_a_id", "airport_b_id"], name: "index_connections_on_airport_a_id_and_airport_b_id"
    t.index ["airport_a_id"], name: "index_connections_on_airport_a_id"
    t.index ["airport_b_id"], name: "index_connections_on_airport_b_id"
  end

  add_foreign_key "connections", "airports", column: "airport_a_id"
  add_foreign_key "connections", "airports", column: "airport_b_id"
end
