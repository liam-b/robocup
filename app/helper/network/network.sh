#!/bin/bash

# First argument is the bot's name, second is the command/message to be sent

name=hostname

in_dir="~/robocup/app/helper/network"
if [ ${name} == 'NRC1' ]
then
  ssh robot@192.168.43.242 "touch ${in_dir}/in.txt; echo $2 > ${in_dir}/in.txt; exit"
  echo 'done'
else if [ ${name} == 'NRC2' ]
then
  echo 'nrc2'
else
  echo 'nein'
fi
