require "rails_helper"

feature "Create new connection", js: true do
  given!(:krakow_airport) { Fabricate(:airport) }
  given!(:buenos_aires_airport) { Fabricate(:airport, city: "Buenos Aires", country: "Argentina", y: -34.8222, x: -58.5358, icao: "AIRS") }

  scenario "creates new connection" do
    visit '/connections/new'

    within('#new_connection') do
      select "Argentina", from: "country_a_name"
      expect(find('#connection_airport_a_id').disabled?).to eq(false)
      select "AIRS, Fake airport", from: "connection_airport_a_id"

      select "Poland", from: "country_b_name"
      expect(find('#connection_airport_b_id').disabled?).to eq(false)
      select "KKOO, Fake airport", from: "connection_airport_b_id"
    end

    click_button 'Submit'
    expect(current_path).to eq("/connections")
  end
end
