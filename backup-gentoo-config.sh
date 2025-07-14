#!/usr/bin/env sh

while IFS= read -r line; do
  # Skip empty lines and comments
  if [ -z "$line" ] || [ "${line%${line#?}}"x = '#x' ]; then
    continue
  fi

  # Remove leading/trailing whitespace from the line
  path=$(echo "$line" | xargs)

  # Check if the path is empty after trimming whitespace
  if [ -z "$path" ]; then
    continue
  fi

  destination_path="$PWD/$path"
  destination_dir=$(dirname "$destination_path")
  mkdir -p "$destination_dir"

  if [ -e "$path" ]; then
    cp -r "$path" "$destination_path"
    if [ $? -eq 0 ]; then
      printf "Successfully copied: '%s' to '%s'\n" "$path" "$destination_path"
    else
      printf "Error copying: '%s' to '%s'\n" "$path" "$destination_path"
    fi
  else
    printf "Source path not found: '%s'\n" "$path"
  fi

done < gentoo-backup-paths

echo "Done."
