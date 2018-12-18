#!/usr/bin/env bash

branchName=$1
buildID=$2
gitCommit=$3
projectName=$4

npx cross-env BUILD_VERSION=${branchName}-${buildID} npm run build

cat <<EOF | curl -X POST -d @- https://api.github.com/repos/vivedu/VIVEDU-Store/statuses/${gitCommit}?access_token=45623b16f425bac1b88b2d5e3ab68654efc067ca -H "Content-Type:application/json"
{
  "state": "success",
  "context": "continuous-integration/jenkins/pr-head",
  "target_url": "http://ci.in.vivedu.com:8080/blue/organizations/jenkins/${projectName}/detail/${branchName}/${buildID}/pipeline/"
}
EOF
