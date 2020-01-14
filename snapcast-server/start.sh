#!/usr/bin/env bash

# Start snapserver if multi room is enabled
if [[ -z $DISABLE_MULTI_ROOM ]]; then
  snapserver
else
  echo "Multi room audio is disabled, not starting snapserver."
  while : ; do echo "${MESSAGE=Idling...}"; sleep ${INTERVAL=600}; done
fi

