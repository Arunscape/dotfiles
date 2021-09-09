if not functions -q fisher
    set -q XDG_CONFIG_HOME; or set XDG_CONFIG_HOME ~/.config
    curl https://git.io/fisher --create-dirs -sLo $XDG_CONFIG_HOME/fish/functions/fisher.fish
    fish -c fisher
end

set PATH $PATH ~/.cargo/bin
#set PATH $PATH ~/Android/Sdk/platform-tools
#set PATH $PATH ~Android/Sdk/tools
set PATH $PATH ~/go/bin
set PATH $PATH ~/.emacs.d/bin
set PATH $PATH ~/.deno/bin

#set -g fish_emoji_width 2
set -x VISUAL nvim
#set -Ux ANDROID_SDK_ROOT /opt/android-sdk
#set -U fish_user_paths /opt/android-sdk/emulator $fish_user_paths
set -U fish_user_paths /opt/android-sdk/platform-tools $fish_user_paths
#set -x CHROME_EXECUTABLE google-chrome-stable

type -q starship; and starship init fish | source &
type -q thefuck; and thefuck --alias | source &
type -q gh; and gh completion -s fish | source &
type -q bat; and set -x MANPAGER "sh -c 'col -bx | bat -l man -p'" &

# emacs tramp
if test "$TERM" = "dumb"
  function fish_prompt
    echo "\$ "
  end

  function fish_right_prompt; end
  function fish_greeting; end
  function fish_title; end
end
