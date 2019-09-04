#!/bin/bash

mkdir -p $HOME/.config 
ln -sf ~/dotfiles/.bashrc ~/.bashrc
ln -sf ~/dotfiles/.vimrc ~/.vimrc
ln -sf ~/dotfiles/.config/kitty/ ~/.config/
ln -sf ~/dotfiles/.config/sway/ ~/.config/
#ln -sf ~/dotfiles/.xinitrc ~/.xinitrc
#ln -sf ~/dotfiles/.Xresources ~/.Xresources
#ln -sf ~/dotfiles/.config/waybar ~/.config/

curl -Lo $HOME/Excision_APEX_3840x2160_Wallpaper.jpg https://github.com/Arunscape/arch-install-config/raw/master/configs/home/Excision_APEX_3840x2160_Wallpaper.jpg

echo "Are you using a laptop? (y/n)"
read LAPTOP
if [ "$LAPTOP" == "y" ]
then
    yay -S --noconfirm --needed \
    brillo \
    libinput-gestures

    sudo gpasswd -a $USER input
    libinput-gestures-setup autostart

    ln -sf ~/dotfiles/.config/libinput-gestures.conf ~/.config/libinput-gestures.conf
fi
