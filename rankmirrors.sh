#!/bin/bash

sudo pacman -S --noconfirm --needed reflector

sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.backup

sudo reflector \
            --threads 10 \
            --verbose \
            --save "/etc/pacman.d/mirrorlist" \
            --protocol https \
            --sort rate \
            --age 24 \
            --score 100 \
            --fastest 100 \
            --latest 100
