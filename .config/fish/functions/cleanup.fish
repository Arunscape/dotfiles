function cleanup
  find . -type d -name node_modules -exec rm -rv {} +
  find . -type d -name target -exec rm -rv {} +
  find . -type d -name build -exec rm -rv {} +
  find . -type d -name .venv -exec rm -rv {} +
  find . -type d -name venv -exec rm -rv {} +
  find . -type d -name .embuild -exec rm -rv {} +
  find . -type d -name .gradle -exec rm -rv {} +
end
