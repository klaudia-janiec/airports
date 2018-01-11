require "rails_helper"

feature "Get all connections", js: true do
  given!(:krakow_airport) { Fabricate(:airport) }
  given!(:buenos_aires_airport) { Fabricate(:airport, city: "Buenos Aires", country: "Argentina", y: -34.8222, x: -58.5358, icao: "AIRS") }

  context "when connection exists" do
    background { Connection.create!(airport_a: buenos_aires_airport, airport_b: krakow_airport) }

    scenario "shows connections airport" do
      visit '/connections'

      map = find("#map")
      page.driver.browser.action.move_to(map.native, 397, 425).perform

      label = find(:xpath, "//div[@class='gm-style']/div[1]")
      expect(label[:title]).to eq("AIRS, Buenos Aires, Argentina")

      page.driver.browser.action.move_to(map.native, 620, 159).perform

      label = find(:xpath, "//div[@class='gm-style']/div[1]")
      expect(label[:title]).to eq("KKOO, Kraków, Poland")
    end
  end

  context "when connection doesn't exist" do
    scenario "doesn't show airports" do
      visit '/connections'

      map = find("#map")
      page.driver.browser.action.move_to(map.native, 397, 425).perform

      label = find(:xpath, "//div[@class='gm-style']/div[1]")
      expect(label[:title]).to eq("")

      page.driver.browser.action.move_to(map.native, 620, 159).perform

      label = find(:xpath, "//div[@class='gm-style']/div[1]")
      expect(label[:title]).to eq("")
    end
  end
end
