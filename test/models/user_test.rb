require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "#session" do
    joe = users(:joe)
    api_key = joe.session_api_key
    assert api_key.access_token =~ /\S{32}/
    assert api_key.user_id == joe.id
  end
end
