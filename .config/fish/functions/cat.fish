function cat
	if type -q bat
		bat -pp $argv
	else
		command cat $argv
	end
end
