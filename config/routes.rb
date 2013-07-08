SimpleAuth::Application.routes.draw do
  resources :users, except: [:new, :edit, :destroy]
  post 'session' => 'session#create'
end
