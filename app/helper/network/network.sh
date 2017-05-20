#!/bin/sh

function write {
  echo $1 > in.txt
}

if [$1 == 'NRC1']; then
  ssh robot@192.168.43.242
  cd ~/robocup/app/helper/network
  write $2
  exit
fi
