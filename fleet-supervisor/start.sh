#!/usr/bin/env bash

# Start snapclient if multi room is enabled
if [[ -z $DISABLE_MULTI_ROOM ]]; then
  cd /usr/src/
  npm start
else
  echo "Multi room audio is disabled, not starting fleet supervisor."
  while : ; do echo "${MESSAGE=Idling...}"; sleep ${INTERVAL=600}; done
fi

