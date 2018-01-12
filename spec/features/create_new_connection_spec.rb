require "rails_helper"

feature "Create new connection", js: true do
  given!(:krakow_airport) { Fabricate(:airport) }
  given!(:buenos_aires_airport) { Fabricate(:airport, city: "Buenos Aires", country: "Argentina", y: -34.8222, x: -58.5358, icao: "AIRS") }

  background { visit '/connections/new' }

  scenario "creates new connection" do
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

  context "when source airport is the same as destination airport" do
    scenario "doesn't create new connection" do
      within('#new_connection') do
        select "Argentina", from: "country_a_name"
        select "AIRS, Fake airport", from: "connection_airport_a_id"

        select "Argentina", from: "country_b_name"
        select "AIRS, Fake airport", from: "connection_airport_b_id"
      end

      click_button 'Submit'
      expect(current_path).to eq("/connections")
      expect(page).to have_text("Source airport and destination airport should be different")
    end
  end

  context "when connection already exists" do
    background { Connection.create!(airport_a: buenos_aires_airport, airport_b: krakow_airport) }

    scenario "doesn't create new connection" do
      within('#new_connection') do
        select "Argentina", from: "country_a_name"
        select "AIRS, Fake airport", from: "connection_airport_a_id"

        select "Poland", from: "country_b_name"
        select "KKOO, Fake airport", from: "connection_airport_b_id"
      end

      click_button 'Submit'
      expect(current_path).to eq("/connections")
      expect(page).to have_text("Source port has already been taken")
    end
  end
end
