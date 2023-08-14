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
# open issue:
# https://github.com/python-poetry/poetry/issues/5929
#type -q poetry; and poetry completions fish | source &

set -Ua fish_user_paths $HOME/.cargo/bin
