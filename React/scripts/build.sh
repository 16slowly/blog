#!/usr/bin/env bash

branchName=$1
buildID=$2
gitCommit=$3
projectName=$4

npx cross-env BUILD_VERSION=${branchName}-${buildID} npm run build

cat <<EOF | curl -X POST -d @- https://api.github.com/repos/example/statuses/${gitCommit}?access_token=access_token ca -H "Content-Type:application/json"
{
  "state": "success",
  "context": "continuous-integration/jenkins/pr-head",
  "target_url": "http://ci.example.com/blue/organizations/jenkins/${projectName}/detail/${branchName}/${buildID}/pipeline/"
}
EOF
