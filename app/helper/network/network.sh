#!/bin/sh

# First argument is the bot's name, second is the command/message to be sent
# write_text () {
#     echo $1 > in.txt
# }
# write_text $2
if [ $1 = "NRC1" ]; then
  ssh liam@192.168.43.218 "touch in.txt; echo $2 > in.txt; exit"
  # ssh robot@192.168.43.242 "echo ${args[1]} > ~/robocup/app/helper/network/in.txt; exit"
  echo 'done'
fi
