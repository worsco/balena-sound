#!/usr/bin/env bash

# Start snapclient if multi room is enabled
if [[ -z $DISABLE_MULTI_ROOM ]]; then
  SNAPCAST_SERVER=$(curl --silent http://localhost:3000)
  echo -e "Starting snapclient...\nTarget snapcast server: $SNAPCAST_SERVER"
  snapclient -h $SNAPCAST_SERVER
else
  echo "Multi room audio is disabled, not starting snapclient."
  while : ; do echo "${MESSAGE=Idling...}"; sleep ${INTERVAL=600}; done
fi

