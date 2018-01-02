class ConnectionsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json { render json: Connection.all, include: ['airport_a', 'airport_b'] }
    end
  end

  def new
    @airports = Airport.all
    @countries = Airport.all.pluck(:country).uniq.sort
    @connection = Connection.new
  end

  def create
    @connection = Connection.new(permitted_attributes)

    if @connection.save
      redirect_to connections_path
    else
      redirect_to connections_path
      flash[:error] = @connection.errors.full_messages
    end
  end

  private

  def permitted_attributes
    params.require(:connection).permit(:airport_a_id, :airport_b_id)
  end
end
