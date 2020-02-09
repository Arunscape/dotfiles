#!/bin/bash

mkdir -p $HOME/.config 
mkdir -p $HOME/.vim 
ln -sf ~/dotfiles/.bashrc ~/.bashrc
ln -sf ~/dotfiles/.vimrc ~/.vimrc
ln -sf ~/dotfiles/.config/kitty/ ~/.config/
ln -sf ~/dotfiles/.config/sway/ ~/.config/
ln -sf ~/dotfiles/.config/i3blocks/ ~/.config/
#ln -sf ~/dotfiles/.xinitrc ~/.xinitrc
#ln -sf ~/dotfiles/.Xresources ~/.Xresources
#ln -sf ~/dotfiles/.config/waybar ~/.config/
ln -sf ~/dotfiles/.config/fish/ ~/.config/
ln -sf ~/dotfiles/.config/kak/ ~/.config/
ln -sf /bin/dash /bin/sh
ln -sf ~/dotfiles/.config/nvim/ ~/.config/
ln -sf ~/dotfiles/.config/ranger/ ~/.config/
ln -sf ~/dotfiles/.config/zathura/ ~/.config/
ln -sf ~/dotfiles/.vim/coc.vim ~/.vim/coc.vim

curl -Lo $HOME/Excision_APEX_3840x2160_Wallpaper.jpg https://github.com/Arunscape/arch-install-config/raw/master/configs/home/Excision_APEX_3840x2160_Wallpaper.jpg

curl -Lo $HOME/.config/kitty/theme.conf https://raw.githubusercontent.com/dexpota/kitty-themes/master/themes/gruvbox_dark.conf

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

sudo groupadd plugdev
sudo usermod -aG plugdev $USER

sudo bash -c "cat > /etc/NetworkManager/conf.d/dns-servers.conf << EOF
[global-dns-domain-*]
servers=1.1.1.1,1.0.0.1,2606:4700:4700::1111,2606:4700:4700::1001
EOF"
