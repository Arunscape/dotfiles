#!/bin/bash

echo "Are you Arun?"
read ANSWER

if [ $ANSWER == "yes" ]
then
    git config --global user.email "8227297+Arunscape@users.noreply.github.com"
    git config --global user.name "Arunscape"
    git config --global push.autoSetupRemote true
fi

cat > $HOME/.gitignore_global << EOF
tags
EOF

git config --global core.excludesfile $HOME/.gitignore_global
git config --global core.editor "nvim"

yay -S git-delta
git config --global core.pager "delta --dark"
