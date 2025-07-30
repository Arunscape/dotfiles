#!/bin/bash
set +e

mkdir -p $HOME/.config
ln -sf $HOME/dotfiles/.bashrc $HOME/.bashrc
ln -sf $HOME/dotfiles/.makepkg.conf $HOME/.makepkg.conf
ln -sf $HOME/dotfiles/.latexmkrc $HOME/.latexmkrc
ln -sf $HOME/dotfiles/.config/wallpaper $HOME/.config/wallpaper
ln -sf $HOME/dotfiles/.config/libinput-gestures.conf $HOME/.config/libinput-gestures.conf
ln -sf $HOME/dotfiles/.zshrc $HOME/.zshrc
ln -sf $HOME/dotfiles/.local/share/applications/defaults.list $HOME/.local/share/applications/defaults.list
ln -sf $HOME/dotfiles/.config/kdesurc $HOME/.config/kdesurc
#ln -sf $HOME/dotfiles/.config/gamemode.ini $HOME/.config/gamemode.ini


ln_overwrite_folder(){
    # $1 is the source
    # $2 is the destination

    mkdir -p deleteme

    # if ~/$1 not a link move it to a folder
    [ ! -L "$HOME/$1" ] && [ -d "$HOME/$1" ] && mv -f $HOME/$1 deleteme

    ln -sf $HOME/dotfiles/$1 $2

    [ -d deleteme/$1 ] && echo consider deleting: deleteme/$1

    echo linked $HOME/$1

}

# https://unix.stackexchange.com/questions/29769/trailing-slashes-on-symbolic-links-to-directories
# no trailing slashes for this to work!
ln_overwrite_folder .config/doom $HOME/.config
ln_overwrite_folder .config/kitty $HOME/.config
ln_overwrite_folder .config/sway $HOME/.config
ln_overwrite_folder .config/fish $HOME/.config
ln_overwrite_folder .config/nvim $HOME/.config
ln_overwrite_folder .config/ranger $HOME/.config
ln_overwrite_folder .config/zathura $HOME/.config
ln_overwrite_folder .config/mako $HOME/.config
ln_overwrite_folder .config/wofi $HOME/.config
ln_overwrite_folder .config/picom $HOME/.config
ln_overwrite_folder .config/i3 $HOME/.config
ln_overwrite_folder .config/i3status-rust $HOME/.config
ln_overwrite_folder .config/paru $HOME/.config
ln_overwrite_folder .config/wezterm $HOME/.config
ln_overwrite_folder .config/eww $HOME/.config
ln_overwrite_folder .config/hypr $HOME/.config
ln_overwrite_folder .config/waybar $HOME/.config
ln_overwrite_folder .config/pipewire $HOME/.config
ln_overwrite_folder .config/containers $HOME/.config
ln_overwrite_folder .config/systemd $HOME/.config
ln_overwrite_folder .config/git $HOME/.config
ln_overwrite_folder .config/environment.d $HOME/.config
ln_overwrite_folder .config/mpv $HOME/.config
ln_overwrite_folder .config/rc $HOME/.config
