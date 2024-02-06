eval "$(/opt/homebrew/bin/brew shellenv)"
[ -f ~/.atb.zsh ] && source ~/.atb.zsh
[ -f ~/.zplug/init.zsh ] && source ~/.zplug/init.zsh


if [ $TERM != "dumb" ]; then
  eval "$(starship init zsh)"
  eval $(thefuck --alias)
  [ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
  export FZF_DEFAULT_COMMAND='rg --files --hidden'
fi

vim() {
	if hash nvim 2>/dev/null; then
		nvim "$@"
	else
		command vim "$@"
	fi
}

cat() {
  if hash bat 2>/dev/null; then
    bat -pp "$@"
  else
    command cat "$@"
  fi
}

unalias grep 2>/dev/null
grep() {
  echo hello
  if hash rg 2>/dev/null; then
    rg "$@"
  else
    command grep "$@"
  fi
}

unalias ls 2>/dev/null
ls() {
  if hash lsd 2>/dev/null; then
    lsd "$@"
  else
    command ls "$@"
  fi
}

ranger() {
  tempfile=$(mktemp)

  command ranger --choosedir="$tempfile" "${@:-$(pwd)}"
  test -f "$tempfile" && 
    if [ "$(cat -- "$tempfile")" != "$(echo -n `pwd`)" ]; then
      cd -- "$(cat "$tempfile")"
    fi
  rm -f -- "$tempfile"
}

PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

zplug "aperezdc/zsh-fzy"
zplug "zsh-users/zsh-history-substring-search"

# Install plugins if there are plugins that have not been installed
if ! zplug check --verbose; then
    printf "Install? [y/N]: "
    if read -q; then
        echo; zplug install
    fi
fi

# Then, source plugins and add commands to $PATH
zplug load --verbose

#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"
