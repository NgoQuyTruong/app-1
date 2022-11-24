class Post < ApplicationRecord
    require 'nokogiri'
  
    belongs_to :user
    has_many :comments
    has_many :votes
    has_many :post_notifications
    
    has_many :post_categories, foreign_key: :post_id
    has_many :categories, through: :post_categories

    has_many :post_tags, foreign_key: :post_id
    has_many :tags, through: :post_tags
  
    validates :title, :body, presence: true
    scope :visible, -> {where visible: true} 

    extend FriendlyId
    friendly_id :permalink, use: :slugged
  
    def should_generate_new_friendly_id?
      permalink_changed? || super
    end

    
    #   acts_as_url :title, url_attribute: :slug, sync: true

    #   def to_param
    #     "#{id}-#{slug}"
    #   end
    before_save :time_read_post, :get_summary_post

    def time_read_post
      doc = Nokogiri::HTML(self.body)
      words = doc.content.split(/\s+/).length
      count_word = (words/300.0).ceil
      self.readtime = count_word
    end
    
    def get_summary_post
      Nokogiri::HTML(p).content.split(/\s+/).take(3).join(" ")
      doc = Nokogiri::HTML(self.body)
      summary = doc.content.split(/\s+/).take(30).join(" ")
      self.summary = summary
    end

    def create_nofification
      user.follower_ids.each do |u_follow|
        PostNotification.create(
          post_id: self.id,
          user_id: u_follow,
          from_user: user.id,
          notification_type: "post",
          content: "#{user.name} đã thêm bài viết mới !",
          custom_fields: "0"
        )
      end
    end
    
end
