require "rails_helper"

feature "Get all airports", js: true do
  background { Fabricate(:airport) }

  scenario "shows airports" do
    visit '/airports'

    # window = Capybara.current_session.current_window
    # window.resize_to(1200, 500)

    map = find("#map")
    page.driver.browser.action.move_to(map.native, 624, 159).perform

    label = find(:xpath, "//div[@class='gm-style']/div[1]")
    expect(label[:title]).to eq("KKOO, Kraków, Poland")
  end
end
