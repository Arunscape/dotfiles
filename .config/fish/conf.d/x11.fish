set T (tty)
if test -z "$DISPLAY"; and test $T = "/dev/tty2"
  echo '\
if [ # -gt 0 ]
then
  $*
else
  dbus-update-activation-environment --systemd DISPLAY
  eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets,ssh)
  export SSH_AUTH_SOCK
  export XDG_SESSION_TYPE=x11
  export GDK_BACKEND=x11
  exec gnome-session
fi
' > ~/dotfiles/.config/X11/nvidia-xinitrc 
  nvidia-xrun
end

if test -z "$DISPLAY"; and test $T = "/dev/tty3"
  echo '\
if [ # -gt 0 ]
then
  $*
else
  dbus-update-activation-environment --systemd DISPLAY
  eval $(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets,ssh)
  export SSH_AUTH_SOCK
  export XDG_SESSION_TYPE=x11
  export GDK_BACKEND=x11
  exec i3
fi
' > ~/dotfiles/.config/X11/nvidia-xinitrc 
  nvidia-xrun
end
