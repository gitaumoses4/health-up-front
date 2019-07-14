#!/usr/bin/env bash
yarn build

cd ./build/

function createHost(){
    host="ftp://ftp.healthupsa.com/$1 --user qcitteam751022:UP123up!";
}
export -f createHost

function uploadFiles(){
    if [[ ${1} != "." ]]
    then
        createHost ""
        curl $(echo ${host} ) -Q "MKD $1";
    fi

    cd $1
    pwd
    for f in $(find . -maxdepth 1 -type f)
    do
        echo ${f}
        fileName=$(echo ${f} | cut -c 2-)
        createHost $(echo "$1${fileName}" | cut -c 3-)
        curl $(echo ${host}) -T ${f}
    done

    if [[ ${1} != "." ]]
    then
        cd ..
    fi
}

export -f uploadFiles

find . -type d -exec bash -c 'uploadFiles "$0"' {} \;
