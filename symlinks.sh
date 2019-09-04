#!/bin/bash

mkdir -p $HOME/.config 
ln -sf ~/dotfiles/.bashrc ~/.bashrc
ln -sf ~/dotfiles/.vimrc ~/.vimrc
ln -sf ~/dotfiles/.config/kitty/ ~/.config/
ln -sf ~/dotfiles/.config/sway/ ~/.config/
#ln -sf ~/dotfiles/.xinitrc ~/.xinitrc
#ln -sf ~/dotfiles/.Xresources ~/.Xresources
ln -sf ~/dotfiles/.config/waybar ~/.config

curl -Lo $HOME/Excision_APEX_3840x2160_Wallpaper.jpg https://github.com/Arunscape/arch-install-config/raw/master/configs/home/Excision_APEX_3840x2160_Wallpaper.jpg
