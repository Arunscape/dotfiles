#!/bin/bash

sudo pacman -S --needed \
neovim \
firefox-developer-edition \
noto-fonts \
ttf-fira-code \
fish \
mpv \
thefuck \
lsd \
bat \
sl \
ripgrep \
lolcat \
kitty \
openssh \
openssl \
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
sway \
wofi \
wl-clipboard \
discord \
mako \
rustup \
clang \
materia-gtk-theme \
waybar \
xorg-xwayland \
github-cli \
mesa \
emacs \
steam \
bluez \
bluez-utils \
pipewire \
pipewire-pulse



yay -S --needed \
ttf-twemoji \
starship \
universal-ctags-git \
ripgrep-all \
spotify \
texlive-latexindent-meta \
minecraft

git clone https://github.com/alexanderjeurissen/ranger_devicons ~/.config/ranger/plugins/ranger_devicons

git clone --depth 1 https://github.com/hlissner/doom-emacs ~/.emacs.d
~/.emacs.d/bin/doom install
