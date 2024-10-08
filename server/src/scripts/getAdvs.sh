#!/bin/bash

cd "$HOME/Android/Sdk/emulator" || {
  echo "Emulator directory not found!"
  exit 1
}

./emulator -list-avds