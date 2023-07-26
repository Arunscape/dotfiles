#!/bin/bash
set +e

mkdir -p $HOME/.config
ln -sf $HOME/dotfiles/.bashrc $HOME/.bashrc
ln -sf $HOME/dotfiles/.makepkg.conf $HOME/.makepkg.conf
ln -sf $HOME/dotfiles/.latexmkrc $HOME/.latexmkrc
ln -sf $HOME/dotfiles/.config/kitty/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/sway/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/fish/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/nvim/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/ranger/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/zathura/ $HOME/.config/
ln -sf $HOME/dotfiles/.config/mako $HOME/.config/
ln -sf $HOME/dotfiles/.config/wallpaper $HOME/.config/wallpaper
ln -sf $HOME/dotfiles/.config/libinput-gestures.conf $HOME/.config/libinput-gestures.conf
ln -sf $HOME/dotfiles/.config/wofi $HOME/.config/
ln -sf $HOME/dotfiles/.config/base16-shell $HOME/.config/base16-shell
ln -sf $HOME/dotfiles/.doom.d $HOME
ln -sf $HOME/dotfiles/.config/picom $HOME/.config
ln -sf $HOME/dotfiles/.config/i3 $HOME/.config
ln -sf $HOME/dotfiles/.config/i3status-rust $HOME/.config
ln -sf $HOME/dotfiles/.config/paru $HOME/.config
ln -sf $HOME/dotfiles/.zshrc $HOME/.zshrc
ln -sf $HOME/dotfiles/.config/wezterm $HOME/.config
ln -sf $HOME/dotfiles/.config/eww $HOME/.config
ln -sf $HOME/dotfiles/.config/hypr $HOME/.config

sudo ln -sf /bin/dash /bin/sh
