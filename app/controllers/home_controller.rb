class HomeController < ApplicationController
	# only index action: on the server on the index no need to require authentication
  skip_before_action :authenticate_tenant!, :only => [ :index ]

  def index
  	# all the tenants  similar to session user id in alpha blog
  	if current_user
  		if session[:tenant_id]
  			Tenant.set_current_tenant session[:tenant_id]
  		else
  			Tenant.set_current_tenant current_user.tenants.first
  		end
  		@tenant = Tenant.current_tenant
      @projects = Project.by_user_plan_and_tenant(@tenant.id, current_user.id)
  		params[:tenant_id] = @tenant.id
  	end
  end
end
