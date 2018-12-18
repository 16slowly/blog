#!/usr/bin/env bash

environment=$1

if [ $environment == development ]; then
  certificates=".nginx/dev/next.store.pem .nginx/dev/next.store.key"
  host=dev@dev.vivedu.com
  nginxConfig=.nginx/dev/next.store
elif [ $environment == production ]; then
  certificates=".nginx/prod/store.pem .nginx/prod/store.key"
  host=dev@vivedu.com
  nginxConfig=.nginx/prod/store
fi

npx cross-env DEPLOYMENT_ENV=$environment npm run upload

scp $certificates $host:/etc/nginx/cert

scp $nginxConfig $host:/etc/nginx/sites-available

ssh $host "sudo /usr/sbin/service nginx reload"
