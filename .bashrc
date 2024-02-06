# Environment variables
[ -x "$(command -v yarn)" ] && export PATH="$(yarn global bin):$PATH"
export PATH=$PATH:$HOME/.local/bin
export PATH=$PATH:$HOME/.cargo/bin

# Aliases

if [[ $TERM = dumb ]]; then
    return
fi


[ -f ~/.fzf.bash ] && source ~/.fzf.bash

[ -x "$(command -v thefuck)" ] && eval $(thefuck --alias)
. "$HOME/.cargo/env"

#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"
