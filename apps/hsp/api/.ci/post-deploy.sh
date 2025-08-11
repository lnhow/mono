#!/bin/bash
set -e

echo "$PWD"

sh "$PWD/apps/hsp/api/.ci/build.sh"
sh "$PWD/apps/hsp/api/.ci/start.sh"
