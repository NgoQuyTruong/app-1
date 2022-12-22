class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :posts
  has_many :comments
  has_many :votes
  has_many :notifications
  has_many :replycomments
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one_attached :avatar

  before_create :default_name
  

  # nguoi theo doi (nguoi dang theo doi minh)
  has_many :friendship_followers, foreign_key: :followed_id, class_name: "FriendShip"
  has_many :followers, through: :friendship_followers

  # nguoi dang theo doi (minh dang theo doi nguoi khac)
  has_many :friendship_followeds, foreign_key: :follower_id, class_name: "FriendShip"
  has_many :followeds, through: :friendship_followeds

  extend FriendlyId
  friendly_id :name, use: :slugged
  

  def default_avatar
      avatar
  end

  def default_name
    self.name = self.email.split("@").take(1)[0]
  end

  def posts_count
    posts.count
  end

  def followers_count
    followers.count
  end

  def send_message_to_me
    "chat/#{self.id}"
  end
end
