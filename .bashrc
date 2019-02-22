# Environment variables

# Functions
yarn(){
	command yarn $@ | lolcat
}

# Start sway automatically
if [ "$(tty)" = "/dev/tty1" ]; then
	sway
	exit 0
fi
