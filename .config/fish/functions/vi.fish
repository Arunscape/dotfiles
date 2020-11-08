function vi
	if type -q nvim
		nvim $argv
	else if command -v vim > /dev/null
		command vim $argv
	else
		command vi $argv
	end
end
