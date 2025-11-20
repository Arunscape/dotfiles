function startservices
  cd ~/.config/rc/init.d/
  ls | xargs -I % -n 1 rc-service --user "%" start &
end
