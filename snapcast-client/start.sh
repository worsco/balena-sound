#!/usr/bin/env bash
SNAPCAST_SERVER=$(curl --silent http://localhost:3000)
echo -e "Starting snapclient...\nTarget snapcast server: $SNAPCAST_SERVER"
snapclient -h $SNAPCAST_SERVER
