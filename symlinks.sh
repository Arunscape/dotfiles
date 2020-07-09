#!/bin/bash

mkdir -p $HOME/.config 
mkdir -p $HOME/.vim 
ln -sf ~/dotfiles/.bashrc ~/.bashrc
ln -sf ~/dotfiles/.vimrc ~/.vimrc
ln -sf ~/dotfiles/.makepkg.conf ~/.makepkg.conf
ln -sf ~/dotfiles/.config/kitty/ ~/.config/
ln -sf ~/dotfiles/.config/sway/ ~/.config/
ln -sf ~/dotfiles/.config/fish/ ~/.config/
ln -sf /bin/dash /bin/sh
ln -sf ~/dotfiles/.config/nvim/ ~/.config/
ln -sf ~/dotfiles/.config/ranger/ ~/.config/
ln -sf ~/dotfiles/.config/zathura/ ~/.config/
ln -sf ~/dotfiles/.vim/coc.vim ~/.vim/coc.vim
ln -sf ~/dotfiles/.config/mako ~/.config/
ln -sf ~/dotfiles/.config/wallpaper ~/.config/wallpaper
ln -sf ~/dotfiles/.emacs.d ~/.emacs.d
# ln -sf ~/dotfiles/.config/i3blocks/ ~/.config/
#ln -sf ~/dotfiles/.xinitrc ~/.xinitrc
#ln -sf ~/dotfiles/.Xresources ~/.Xresources
#ln -sf ~/dotfiles/.config/waybar ~/.config/
# ln -sf ~/dotfiles/.config/kak/ ~/.config/