#!/bin/sh
# First argument is the bot's name, second is the command/message to be sent

write_text () {
    echo $1 > in.txt
}
write_text $1
if [ $1 = "NRC1" ]; then
  ssh robot@192.168.43.242 'cd ~/robocup/app/helper/network; echo $2 > in.txt; exit'
fi
