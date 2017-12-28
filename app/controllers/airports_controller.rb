class AirportsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json { render json: Airport.all }
    end
  end
end
