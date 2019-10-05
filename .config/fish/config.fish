eval (starship init fish)

thefuck --alias | source

if not functions -q fisher
    set -q XDG_CONFIG_HOME; or set XDG_CONFIG_HOME ~/.config
    curl https://git.io/fisher --create-dirs -sLo $XDG_CONFIG_HOME/fish/functions/fisher.fish
    fish -c fisher
end

if test (tty) = "/dev/tty1"
    exec sway
end

set PATH $PATH (yarn global bin)
# set PATH $PATH $HOME/.local/bin
set PATH $PATH $HOME/.cargo/bin

set -gx _JAVA_AWT_WM_NONREPARENTING 1
set -g fish_emoji_width 2
set -x MANPAGER "sh -c 'col -bx | bat -l man -p'"
