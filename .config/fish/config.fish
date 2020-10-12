if not functions -q fisher
    set -q XDG_CONFIG_HOME; or set XDG_CONFIG_HOME ~/.config
    curl https://git.io/fisher --create-dirs -sLo $XDG_CONFIG_HOME/fish/functions/fisher.fish
    fish -c fisher
end

set PATH $PATH ~/.cargo/bin
set PATH $PATH ~/Android/Sdk/platform-tools
set PATH $PATH ~Android/Sdk/tools
set PATH $PATH ~/go/bin

set -gx _JAVA_AWT_WM_NONREPARENTING 1
set -g fish_emoji_width 2
set -x ANDROID_HOME ~/Android/Sdk
set -x VISUAL nvim
set -x GTK_THEME Materia-dark
set -gx MOZ_ENABLE_WAYLAND 1
set -x QT_WAYLAND_DISABLE_WINDOWDECORATION 1

type -q starship; and starship init fish | source
type -q thefuck; and thefuck --alias | source
type -q gh; and gh completion -s fish | source
type -q bat; and set -x MANPAGER "sh -c 'col -bx | bat -l man -p'"

if status --is-interactive
    set BASE16_SHELL "$HOME/.config/base16-shell/"
    source "$BASE16_SHELL/profile_helper.fish"
end

if test (tty) = "/dev/tty1"
    exec sway --my-next-gpu-wont-be-nvidia
end
