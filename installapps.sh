#!/bin/bash

sudo pacman -S --noconfirm --needed \
neovim \
noto-fonts \
ttf-fira-code \
fish \
firefox-developer-edition \
vlc \
thefuck \
lsd \
bat \
sl \
lolcat \
kitty \
openssh \
ripgrep \
grim \
slurp \
android-udev \
gimp \
p7zip \
fish \
dash \
ranger \
fzf \
texlive-most \
biber \
zathura \
zathura-pdf-poppler \
pygmentize \
rustup \
sway \
wofi \
wl-clipboard \
discord \
mako


yay -S --noconfirm --needed \
ttf-twemoji \
ulauncher \
starship \
universal-ctags-git \
ripgrep-all \
spotify


rustup default nightly

git clone https://github.com/alexanderjeurissen/ranger_devicons ~/.config/ranger/plugins/ranger_devicons
