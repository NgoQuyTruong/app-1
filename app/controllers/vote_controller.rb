class VoteController < ApplicationController

    def create
        @vote = Vote.new(vote_params)
        @vote.user_id = current_user.id
        @vote.post_id = params[:vote][:post_id]
       # p params[:vote][:post_id]
        #@post = Post.find(params[:vote][:post_id])
       
        if  @vote.save
            @post = Post.friendly.find(params[:vote][:post_id])
            @point_vote = @post.votes.up_vote.count - @post.votes.down_vote.count
            @post_vote_check = current_user.present? ? @post.votes.find_by_user_id(current_user.id) : nil
            p @post
            p @point_vote
            p @post_vote_check
            respond_to do |format|
                format.js 
                # format.json {render :json => {mes: "Gửi bình luận thành công",this_comment: @this_comment, this_user: @this_user }} # index.html.erb
            end
        end
    end
    def update
        @vote = Post.find(params[:id]).votes.find_by_user_id(current_user.id)
        p @vote
        @vote.update(vote_type: params[:vote_type])
        @post = Post.friendly.find(params[:id])
        @point_vote = @post.votes.up_vote.count - @post.votes.down_vote.count
        @post_vote_check = current_user.present? ? @post.votes.find_by_user_id(current_user.id) : nil
        respond_to do |format|
            format.js 
            # format.json {render :json => {mes: "Gửi bình luận thành công",this_comment: @this_comment, this_user: @this_user }} # index.html.erb
        end
    end


    def vote_params
        params.require(:vote).permit(:post_id, :vote_type)
    end

end
