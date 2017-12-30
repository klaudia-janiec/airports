Rails.application.routes.draw do
  root "connections#index"
  resources :airports
  resources :connections
end
