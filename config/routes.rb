Rails.application.routes.draw do
  root "airports#index"
  resources :airports
  resources :connections
end
