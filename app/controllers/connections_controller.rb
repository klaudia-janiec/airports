class ConnectionsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json { render json: Connection.all, include: ['airport_a', 'airport_b'] }
    end
  end
end
