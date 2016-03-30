class Plan
	PLANS = [:free, :premium]

	def self.options
		# get the elements and capitalize them
		PLANS.map { |plan| [plan.capitalize, plan]}
	end

end

