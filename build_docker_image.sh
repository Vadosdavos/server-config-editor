#!/bin/bash
cdw=$(pwd)
DIR=${cdw/\/scripts/""}
cd $DIR
npm run build
docker build -t config_editor .