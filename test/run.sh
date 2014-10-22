#!/bin/bash

RUNTIME_DIR="$(dirname $0)"

echo "Build jsdoc..."
node ${RUNTIME_DIR}/node_modules/jsdoc/jsdoc.js -c ${RUNTIME_DIR}/conf.json
