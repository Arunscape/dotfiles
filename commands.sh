#!/bin/bash

sudo systemctl enable dhcpcd
sudo systemctl start dhcpcd
sudo systemctl enable connman
sudo systemctl start connman


echo "Setup ALL THE THINGS? (y/n)"
read ALLTHETHINGS
if [ "$ALLTHETHINGS" == "y" ]
then
    bash symlinks.sh
    bash gitconfig.sh
    bash ualbertawifi.sh
    bash rankmirrors.sh
    bash installapps.sh
    sudo systemctl enable docker
exit
fi

echo "Symlink dotfiles? (y/n)"
read SYMLINKS
if [ "$SYMLINKS" == "y" ]
then
	bash symlinks.sh
fi

echo "Use my git config? (y/n)"
read GIT
if [ "$GIT" == "y" ]
then
	bash gitconfig.sh
fi

echo "Setup ualberta wifi? (y/n)"
read UALBERTAWIFI
if [ "$UALBERTAWIFI" == "y" ]
then
	bash ualbertawifi.sh
fi

echo "Rank mirrors? (y/n)"
read RANKMIRRORS
if [ "$RANKMIRRORS" == "y" ]
then
        bash rankmirrors.sh
fi

echo "Install apps? (y/n)"
read INSTALL
if [ "$INSTALL" == "y" ]
then
        bash installapps.sh
fi

sudo systemctl enable docker
