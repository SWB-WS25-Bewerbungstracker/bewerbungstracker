#!/bin/bash

#initialize springboot environment variables
#for connection to postgres-db on docker container
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5433/testdb
export SPRING_DATASOURCE_USERNAME=testU
export SPRING_DATASOURCE_PASSWORD=pass
export SPRING_JPA_HIBERNATE_DDL_AUTO=update
echo "database environments set"


