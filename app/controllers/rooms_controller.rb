class RoomsController < ApplicationController
  def index
      @rooms = Room.all
      respond_to do |format|
          format.html # index.html.erb
      end
  end

end
