#!/bin/sh

write_text () {
    echo $1 # > in.txt
}

if [$1 == 'NRC1']; then
  ssh robot@192.168.43.242
  cd ~/robocup/app/helper/network
  write_text $2
  exit
fi
