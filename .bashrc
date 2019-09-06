# Environment variables
export PATH="$(yarn global bin):$PATH"
#export PATH=$PATH:$HOME/.local/bin
export PATH=$PATH:$HOME/.cargo/bin
export _JAVA_AWT_WM_NONREPARENTING=1

# Aliases
alias vi=vim
alias fucking=sudo
alias ls=lsd
alias f=fuck
alias grep=rg

# Start sway automatically
if [ "$(tty)" = "/dev/tty1" ]; then
	sway
	exit 0
fi

[ -f ~/.fzf.bash ] && source ~/.fzf.bash

eval $(thefuck --alias)
