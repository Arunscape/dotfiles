#!/bin/bash

mkdir -p $HOME/.config 
mkdir -p $HOME/.vim 
ln -sf $HOME/dotfiles/.bashrc $HOME/.bashrc
ln -sf $HOME/dotfiles/.vimrc $HOME/.vimrc
ln -sf $HOME/dotfiles/.makepkg.conf $HOME/.makepkg.conf
ln -sf $HOME/dotfiles/.config/kitty/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/sway/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/fish/ $HOME/.config/
ln -sf /bin/dash /bin/sh
ln -sf $HOME/dotfiles/.config/nvim/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/ranger/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/zathura/ $HOME/.config/
ln -sf $HOME/dotfiles/.vim/coc.vim $HOME/.vim/coc.vim
ln -sf $HOME/dotfiles/.config/mako $HOME/.config/
ln -sf $HOME/dotfiles/.config/wallpaper $HOME/.config/wallpaper
ln -sf $HOME/dotfiles/.emacs.d $HOME/.emacs.d