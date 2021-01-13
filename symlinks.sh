#!/bin/bash

mkdir -p $HOME/.config
mkdir $HOME/.config/X11
mkdir -p $HOME/.vim 
ln -sf $HOME/dotfiles/.bashrc $HOME/.bashrc
ln -sf $HOME/dotfiles/.vimrc $HOME/.vimrc
ln -sf $HOME/dotfiles/.makepkg.conf $HOME/.makepkg.conf
ln -sf $HOME/dotfiles/.latexmkrc $HOME/.latexmkrc
ln -sf $HOME/dotfiles/.config/kitty/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/sway/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/fish/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/nvim/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/ranger/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/zathura/ $HOME/.config/
ln -sf $HOME/dotfiles/.vim/coc.vim $HOME/.vim/coc.vim
ln -sf $HOME/dotfiles/.config/mako $HOME/.config/
ln -sf $HOME/dotfiles/.config/wallpaper $HOME/.config/wallpaper
ln -sf $HOME/dotfiles/.emacs.d $HOME/.emacs.d
ln -sf $HOME/dotfiles/.config/libinput-gestures.conf $HOME/.config/libinput-gestures.conf
ln -sf $HOME/dotfiles/.config/wofi $HOME/.config/
ln -sf $HOME/dotfiles/.config/waybar $HOME/.config/
ln -sf $HOME/dotfiles/.config/base16-shell $HOME/.config/base16-shell
ln -sf $HOME/dotfiles/.minecraft/minecraft.sh $HOME/.minecraft/minecraft.sh
ln -sf $HOME/dotfiles/.doom.d $HOME
ln -sf $HOME/dotfiles/.emacs.d $HOME
ln -sf $HOME/dotfiles/.config/X11/nvidia-xinitrc $HOME/.config/X11/nvidia-xinitrc

sudo ln -sf /bin/dash /bin/sh
