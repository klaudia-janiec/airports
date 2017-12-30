class AirportsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json { render json: Airport.all }
    end
  end

  def show
    render json: Airport.find(params[:id])
  end
end
