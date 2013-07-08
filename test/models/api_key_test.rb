require 'test_helper'

class ApiKeyTest < ActiveSupport::TestCase
  test "generates access token" do
    joe = users(:joe)
    api_key = ApiKey.create(scope: 'session', user_id: joe.id)
    assert !api_key.new_record?
    assert api_key.access_token =~ /\S{32}/
  end
end
