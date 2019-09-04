#!/bin/bash

sudo pacman -S --noconfirm --needed pacman-contrib

sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.backup

sudo bash -c "curl https://www.archlinux.org/mirrorlist/all/https/ | sed -e 's/^#Server/Server/' -e '/^#/d' | rankmirrors -n 6 - > /etc/pacman.d/mirrorlist"
