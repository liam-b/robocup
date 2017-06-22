#!/bin/bash

# First argument is the bot's name, second is the command/message to be sent
# write_text () {
#     echo $1 > in.txt
# }
# write_text $2
in_dir="~/robocup/helper/network"
if [ $1 == 'NRC1' ]
then
  ssh robot@192.168.43.242 "touch ${in_dir}/in.txt; echo $2 > ${in_dir}/in.txt; exit" #TEST!!!
  echo 'done'
fi
