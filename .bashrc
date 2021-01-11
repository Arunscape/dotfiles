# Environment variables
[ -x "$(command -v yarn)" ] && export PATH="$(yarn global bin):$PATH"
export PATH=$PATH:$HOME/.local/bin
export PATH=$PATH:$HOME/.cargo/bin

# Aliases
alias vi=vim
alias fucking=sudo
alias ls=lsd
alias f=fuck
alias grep=rg

if [[ $TERM = dumb ]]; then
    return
fi


[ -f ~/.fzf.bash ] && source ~/.fzf.bash

[ -x "$(command -v thefuck)" ] && eval $(thefuck --alias)
