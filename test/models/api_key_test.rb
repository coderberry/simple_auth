require 'test_helper'
require 'minitest/mock'

class ApiKeyTest < ActiveSupport::TestCase
  test "generates access token" do
    joe = users(:joe)
    api_key = ApiKey.create(scope: 'session', user_id: joe.id)
    assert !api_key.new_record?
    assert api_key.access_token =~ /\S{32}/
  end

  test "sets the expired_at properly for 'session' scope" do
    Time.stub :now, Time.at(0) do
      joe = users(:joe)
      api_key = ApiKey.create(scope: 'session', user_id: joe.id)

      assert api_key.expired_at == 4.hours.from_now
    end
  end

  test "sets the expired_at properly for 'api' scope" do
    Time.stub :now, Time.at(0) do
      joe = users(:joe)
      api_key = ApiKey.create(scope: 'api', user_id: joe.id)

      assert api_key.expired_at == 30.days.from_now
    end
  end
end
