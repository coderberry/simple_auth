require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  test "#create" do
    post 'create', {
      user: { 
        username: 'billy', 
        name: 'Billy Blowers', 
        email: 'billy_blowers@example.com', 
        password: 'secret', 
        password_confirmation: 'secret' 
      }
    }
    results = JSON.parse(response.body)
    assert results['api_key']['access_token'] =~ /\S{32}/
    assert results['api_key']['user_id'] > 0
  end

  test "#create with invalid data" do
    post 'create', {
      user: {
        username: '',
        name: '',
        email: 'foo',
        password: 'secret',
        password_confirmation: 'something_else'
      }
    }
    results = JSON.parse(response.body)
    assert results['errors'].size == 3
  end

  test "#show" do
    joe = users(:joe)
    post 'show', { id: joe.id }
    results = JSON.parse(response.body)
    assert results['user']['id'] == joe.id
    assert results['user']['name'] == joe.name
  end

  test "#index without token in header" do
    get 'index'
    assert response.status == 401
  end

  test "#index with invalid token" do
    get 'index', {}, { 'Authorization' => "Bearer 12345" }
    assert response.status == 401
  end

  test "#index with expired token" do
    joe = users(:joe)
    expired_api_key = joe.api_keys.session.create
    expired_api_key.update_attribute(:expired_at, 30.days.ago)
    assert !ApiKey.active.map(&:id).include?(expired_api_key.id)
    get 'index', {}, { 'Authorization' => "Bearer #{expired_api_key.access_token}" }
    assert response.status == 401
  end

  test "#index with valid token" do
    joe = users(:joe)
    api_key = joe.session_api_key
    get 'index', {}, { 'Authorization' => "Bearer #{api_key.access_token}" }
    results = JSON.parse(response.body)
    assert results['users'].size == 2
  end
end
