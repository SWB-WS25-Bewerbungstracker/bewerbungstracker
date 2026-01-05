#!/bin/bash

# --- CONFIGURATION ---
CONTAINER_NAME="keycloak"
REALM_NAME="bt-realm"
HOST_EXPORT_DIR="$(pwd)/.keycloak/realms"
DOCKER_IMAGE="quay.io/keycloak/keycloak:26.4"
NETWORK_NAME="bewerbungstracker_local_network"

# Ensure host directory exists
mkdir -p "$HOST_EXPORT_DIR"

echo "Stopping $CONTAINER_NAME to ensure data consistency..."
docker stop "$CONTAINER_NAME"

echo "Starting export for realm: $REALM_NAME..."

# We run a temporary container that connects to the same Postgres DB
docker run --rm \
    --name keycloak-export-tmp \
    --network "$NETWORK_NAME" \
    -v "$HOST_EXPORT_DIR":/opt/keycloak/export \
    -e KC_DB=postgres \
    -e KC_DB_URL=jdbc:postgresql://postgres-db:5432/testdb \
    -e KC_DB_USERNAME=testU \
    -e KC_DB_PASSWORD=pass \
    "$DOCKER_IMAGE" \
    export \
    --realm "$REALM_NAME" \
    --users realm_file \
    --dir /opt/keycloak/export/ \
    --verbose

echo "------------------------------------------------"
echo "Export complete."
echo "Your files are in: $HOST_EXPORT_DIR"
echo "------------------------------------------------"

echo "Do you want to restart the $CONTAINER_NAME container? [y/n]"
read -r start

# Fixed Bash syntax: added $ for variable and quotes
if [[ "$start" == "y" || "$start" == "Y" ]]; then   
    echo "Starting $CONTAINER_NAME..."
    docker start "$CONTAINER_NAME"
else
    echo "Container remains stopped."
fi