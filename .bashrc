# Environment variables
export PATH="$(yarn global bin):$PATH"
export PATH=$PATH:$HOME/.local/bin
export PATH=$PATH:$HOME/.cargo/bin
# Aliases
alias vi=vim
alias fucking=sudo
alias ls=lsd

# Functions
yarn(){
	command yarn $* | lolcat
}
google-chrome-unstable(){
	command google-chrome-unstable --force-dark-mode $*
}

# Start sway automatically
if [ "$(tty)" = "/dev/tty1" ]; then
	sway
	exit 0
fi
