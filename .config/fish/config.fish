if status is-interactive
    # Commands to run in interactive sessions can go here
end

if not functions -q fisher
    curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source
end

type -q starship; and starship init fish | source &
type -q thefuck; and thefuck --alias | source &
type -q gh; and gh completion -s fish | source &
type -q bat; and set -x MANPAGER "sh -c 'col -bx | bat -l man -p'" &
type -q opam; and eval eval (opam env --switch=default)
# open issue:
# https://github.com/python-poetry/poetry/issues/5929
#type -q poetry; and poetry completions fish | source &

set -Ua fish_user_paths $HOME/.cargo/bin

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
if test -f /opt/miniconda3/bin/conda
    eval /opt/miniconda3/bin/conda "shell.fish" "hook" $argv | source
else
    if test -f "/opt/miniconda3/etc/fish/conf.d/conda.fish"
        . "/opt/miniconda3/etc/fish/conf.d/conda.fish"
    else
        set -x PATH "/opt/miniconda3/bin" $PATH
    end
end
# <<< conda initialize <<<

