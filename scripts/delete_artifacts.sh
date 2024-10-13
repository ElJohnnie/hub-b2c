#!/bin/bash

TOKEN=""
REPO="ElJohnnie/hub-b2c"

ARTIFACTS=$(curl -s -H "Authorization: token $TOKEN" \
                 -H "Accept: application/vnd.github.v3+json" \
                 "https://api.github.com/repos/$REPO/actions/artifacts")

ARTIFACT_IDS=$(echo "$ARTIFACTS" | jq -r '.artifacts[].id')

for ID in $ARTIFACT_IDS; do
    echo "Excluindo artefato com ID: $ID"
    curl -X DELETE -H "Authorization: token $TOKEN" \
         -H "Accept: application/vnd.github.v3+json" \
         "https://api.github.com/repos/$REPO/actions/artifacts/$ID"
done

echo "Todos os artefatos foram excluídos."

