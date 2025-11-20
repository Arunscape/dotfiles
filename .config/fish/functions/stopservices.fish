function stopservices
  cd ~/.config/rc/init.d/
  killall supervise-daemon
  ls | xargs -I % -n 1 rc-service --user "%" stop &
  podman stop (podman ps -aq)
end
  
  
