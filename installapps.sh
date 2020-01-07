#!/bin/bash

sudo pacman -S --noconfirm --needed rustup

yay -S --noconfirm --needed \
vscodium-bin \
brave-dev-bin \
spotify \
sway-git \
ttf-joypixels \
ulauncher \
starship \
wl-clipboard-git \
bat \
universal-ctags-git

sudo pacman -S --noconfirm --needed \
neovim \
mesa \
noto-fonts \
otf-fira-code \
firefox-developer-edition \
vlc \
thefuck \
lsd \
sl \
lolcat \
python \
btrfs-progs \
ntfs-3g \
kitty \
openssh \
yarn \
ripgrep \
grim \
slurp \
i3blocks \
android-udev \
gimp \
p7zip \
fish \
dash \
ranger \
gnome-keyring \
alsa-utils \
fzf \
texlive-most \
biber \
zathura \
zathura-pdf-poppler

rustup default nightly

