class ChatController < ApplicationController
  layout "front_end"
  before_action :authenticate_user!
  def index
    @chat = Chat.all
    @list = current_user.followeds
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @chat }
      format.js 
    end
  end

  def history
    @chat = Chat.all
    @to_user_id = User.find(params[:to_user_id])
    @list = current_user.followeds

    @current_user_messages = Chat.where(from_user_id: current_user.id, to_user_id: params[:to_user_id])
    @remote_user_messages = Chat.where(from_user_id: params[:to_user_id], to_user_id: current_user.id)
    @history_messages = (@current_user_messages + @remote_user_messages).sort_by(&:created_at)
    @history_messages.sort_by(&:created_at)
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @chat }
      format.js 
    end
  end

  def create
    return if  params[:messeger][:content].blank?
    Chat.create(from_user_id: current_user.id, to_user_id: params[:messeger][:to_user_id], content:  params[:messeger][:content])
    respond_to do |format|
      format.js 
    end
  end
end
