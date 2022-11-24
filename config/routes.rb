Rails.application.routes.draw do
  get "/" => "home#index"
  
  concern :paginatable do
    get '(page/:page)', action: :index, on: :collection, as: ''
  end
  
  namespace :admin do
    resources :posts ,concerns: :paginatable
    resources :categories do
      collection do
        post :update_position
      end
    end
    resources :comments
    resources :tags
    resources :users do 
      collection do
        get :edit_password
        get :edit_profile
      end
    end
    
    resources :authors
    root "dashboard#index"
  end
  
  devise_for :users
  resources :categories
  resources :authors do
    member do
      post :create_friendship
      post :destroy_friendship
    end
  end

  
  resources :post do 
    resources :comments do
      post :rep_comment
    end
    resources :vote, only: [:create, :update]
    resources :notifications
  end
  
end
