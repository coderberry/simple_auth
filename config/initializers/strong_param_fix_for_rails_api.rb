# The application controllers don't know anything about ActionController::StrongParameters 
# because they're not extending the class ActionController::StrongParameters was included within. 
# This is why the require() method call is not calling the implementation 
# in ActionController::StrongParameters
#
# see http://stackoverflow.com/questions/13745689/getting-rails-api-and-strong-parameters-to-work-together

ActionController::API.send :include, ActionController::StrongParameters