#!/bin/bash
# ou
#!/usr/bin/env bash
echo "############################# STARTING TRACKING $1 #######################"

if [ -z "$1" ]; then
  adb logcat
else
  adb logcat | grep -F $1
fi
