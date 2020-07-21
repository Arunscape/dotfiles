#!/bin/bash

sudo pacman -S --noconfirm --needed \
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
pulseaudio \
alsa-utils \
otf-font-awesome \
waybar



yay -S --noconfirm --needed \
ttf-twemoji \
starship \
universal-ctags-git \
ripgrep-all \
spotify \
ytop \
texlive-latexindent-meta


rustup default nightly

git clone https://github.com/alexanderjeurissen/ranger_devicons ~/.config/ranger/plugins/ranger_devicons
