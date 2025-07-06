if status is-interactive
    # Commands to run in interactive sessions can go here
end

if not functions -q fisher
    curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source
end

type -q starship; and starship init fish | source &
type -q thefuck; and thefuck --alias | source &
type -q gh; and gh completion -s fish | source &
type -q opam; and eval (opam env --switch=default) &


type -q bat; and set -x MANPAGER "sh -c 'col -bx | bat -l man -p'"; and set -x MANROFFOPT "-c"
# open issue:
# https://github.com/python-poetry/poetry/issues/5929
#type -q poetry; and poetry completions fish | source &

set -Ua fish_user_paths ~/.cargo/bin ~/.config/emacs/bin 


if path filter -qd ~/Android/Sdk
  # The path is a directory
  set -Ux ANDROID_HOME ~/Android/Sdk
end

#type -q fastfetch; and fastfetch


set -Ux XR_RUNTIME_JSON /home/arunscape/code/monado/build/openxr_monado-dev.json
set -Ux VIT_SYSTEM_LIBRARY_PATH /usr/local/lib/libbasalt.so
