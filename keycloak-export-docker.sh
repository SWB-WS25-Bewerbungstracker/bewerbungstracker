#!/bin/bash

CONTAINER_NAME="keycloak"
REALM_NAME="bt-realm"
EXPORT_FILENAME="realm-export.json"
HOST_EXPORT_DIR="$(pwd)/.keycloak/realms"
DOCKER_IMAGE="quay.io/keycloak/keycloak:26.4.0"

echo "Stopping $CONTAINER_NAME..."
docker stop "$CONTAINER_NAME"

echo "Starting export for realm: $REALM_NAME..."


docker run --rm \
    --name keycloak-export \
    --volumes-from "$CONTAINER_NAME" \
    -v "$HOST_EXPORT_DIR":/opt/keycloak/export \
    "$DOCKER_IMAGE" \
    export \
    --realm "$REALM_NAME" \
    --users realm_file \
    --dir /opt/keycloak/data/export/ \
    --verbose

echo "Export complete."
echo "File is located at: $HOST_EXPORT_DIR/$EXPORT_FILENAME"

echo "Do you want to restart the $CONTAINER_NAME container? [y/n]"
read -r start

if [[ start == y  || start == Y ]]; then   
    echo "Starting $CONTAINER_NAME..."
    docker start "$CONTAINER_NAME"
else
    echo "Container remains stopped."
fi


