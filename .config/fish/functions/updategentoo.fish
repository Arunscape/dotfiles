function updategentoo
  doas emaint --auto sync
  doas emerge --ask --verbose --update --deep --changed-use @world
  doas emerge -c
end
