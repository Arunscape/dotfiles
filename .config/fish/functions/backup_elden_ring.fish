
function backup_elden_ring
  set DATE (date +%d-%m-%Y_%H-%M-%S)

  cd ~/znas/elden_ring_backup
  tar -czvpf "Elden_ring_backup_$DATE.tar.gz" ~/.local/share/Steam/steamapps/compatdata/1245620/pfx/drive_c/users/steamuser/AppData/Roaming/EldenRing/
end

