Rails.application.routes.draw do
  root "airports#index"
  resources :airports
end
