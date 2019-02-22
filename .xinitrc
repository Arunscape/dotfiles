# This should unlock the default keyring on startup
# if that doesn't work, then remove the next 2 lines
eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets,ssh)
export SSH_AUTH_SOCK
