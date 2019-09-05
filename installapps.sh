#!/bin/bash

sudo pacman -S --noconfirm --needed \
vim \
mesa \
noto-fonts \
otf-fira-code \
firefox-developer-edition \
vlc \
thefuck \
lsd \
sl \
lolcat \
rustup \
docker \
docker-compose \
rustup \
python \
btrfs-progs \
ntfs-3g \
kitty \
openssh \
yarn \
ripgrep \
wl-clipboard \
grim \
slurp \
i3blocks \
android-udev \
gimp \
gnome-keyring \
libsecret \
p7zip

rustup default nightly

yay -S --noconfirm --needed \
vscodium-bin \
brave-dev-bin \
spotify \
sway-git \
ttf-twemoji \
ulauncher


sudo bash -c "cat > /etc/pam.d/login << EOF
#%PAM-1.0
 
auth       required     pam_securetty.so
auth       requisite    pam_nologin.so
auth       include      system-local-login
auth       optional     pam_gnome_keyring.so
account    include      system-local-login
session    include      system-local-login
session    optional     pam_gnome_keyring.so auto_start
EOF"
