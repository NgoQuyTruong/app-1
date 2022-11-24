class Vote < ApplicationRecord
    belongs_to :user 
    belongs_to :post
    enum vote_type: [:up_vote, :down_vote]
    scope :up_vote, -> {where vote_type: :up_vote} 
    scope :down_vote, -> {where vote_type: :down_vote}
end
