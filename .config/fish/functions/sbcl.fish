function sbcl
	if type -q rlwrap
		rlwrap sbcl $argv
	else
		command sbcl $argv
	end
end
