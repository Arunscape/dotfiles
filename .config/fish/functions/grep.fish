function grep
	if type -q rg
		rg $argv
	else
		command grep $argv
	end
end
