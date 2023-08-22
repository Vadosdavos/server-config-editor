#!/bin/bash

mongoimport --jsonArray -u Admin -p Opm31i9x240 -d config-editor -c admins --file ./docker-entrypoint-initdb.d/admins.json --authenticationDatabase admin
mongoimport --jsonArray -u Admin -p Opm31i9x240 -d config-editor -c serverAddresses --file ./docker-entrypoint-initdb.d/serversAddresses.json --authenticationDatabase admin
mongoimport --jsonArray -u Admin -p Opm31i9x240 -d config-editor -c serverGroups --file ./docker-entrypoint-initdb.d/serversGroups.json --authenticationDatabase admin
mongoimport --jsonArray -u Admin -p Opm31i9x240 -d config-editor -c walletLinkAddresses --file ./docker-entrypoint-initdb.d/walletLinkAddresses.json --authenticationDatabase admin
