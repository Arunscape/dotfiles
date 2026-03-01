#!/usr/bin/env sh
set -e  # Exit on any error

while IFS= read -r line; do
  # Skip empty lines/comments (POSIX case clearer)
  case "$line" in
    '' | '#'* ) continue ;;
  esac

  # Trim whitespace (pure sh, no spawn)
  path=${line#"${line%%[![:space:]]*}"}; path=${path%"${path##*[![:space:]]}"}
  [ -z "$path" ] && continue

  dest="$PWD/$path"
  src_dir=$(dirname "$dest")

  if [ ! -e "$path" ]; then
    printf "Source not found: '%s'\n" "$path"
    continue
  fi

  if [ -d "$path" ]; then
    mkdir -p "$dest"
    if ! cp -r "$path/." "$dest/"; then
      printf "Error copying dir: '%s' to '%s'\n" "$path" "$dest"
      continue
    fi
  elif [ -f "$path" ]; then
    mkdir -p "$src_dir"
    if ! cp "$path" "$dest"; then
      printf "Error copying file: '%s' to '%s'\n" "$path" "$dest"
      continue
    fi
  else
    printf "Unsupported type: '%s'\n" "$path"
    continue
  fi

  printf "Copied: '%s' -> '%s'\n" "$path" "$dest"

done < gentoo-backup-paths

echo "Done."

