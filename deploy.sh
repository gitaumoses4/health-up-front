#!/usr/bin/env bash
yarn build

find ./build/ -exec curl -T {} ftp://ftp.healthupsa.com/root/{} -u qcitteam751022:UP123up! --ftp-create-dirs \;
