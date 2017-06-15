#!/bin/sh

# First argument is the bot's name, second is the command/message to be sent
args=($1 $2)
write_text () {
    echo $1 > in.txt
}
write_text ${args[1]}
if [ ${args[0]} = "NRC1" ]; then
  ssh liam@192.168.43.218 "touch in.txt; echo ${args[1]} > in.txt; exit"
  # ssh robot@192.168.43.242 "echo ${args[1]} > ~/robocup/app/helper/network/in.txt; exit"
  echo 'done'
fi
