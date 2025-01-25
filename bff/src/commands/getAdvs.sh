#!/bin/bash

cd "$HOME/Android/Sdk/emulator" || {
  echo "Emulator directory not found!"
  exit 1
}

mapfile -t avds < <(./emulator -list-avds | grep -v "INFO")

if [ ${#avds[@]} -eq 0 ]; then
  echo "Nenhum AVD encontrado."
  exit 1
fi

for avd in "${avds[@]}"; do
  echo "$avd"
done
