#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${DIGITRAFFIC_CI_PATH:-}" ]]; then
  echo "Error: DIGITRAFFIC_CI_PATH environment variable is required"
  echo "Usage: DIGITRAFFIC_CI_PATH=/path/to/ci/project ./build-image.sh [build_image]"
  exit 1
fi

BUILD_IMAGE="${1:-}"

cd "$(dirname "${BASH_SOURCE[0]}")"

# Check if image should be built
IMAGE_NAME="local_catalog_solr:latest"
if [[ $(docker image ls "$IMAGE_NAME" -q | wc -l) -eq 0 ]] || [[ "$BUILD_IMAGE" = 'build_image' ]]; then
  echo "Building Solr image..."

  # Create build directory
  BUILD_DIR="./build"
  rm -rf "$BUILD_DIR"
  mkdir -p "$BUILD_DIR"

  # Copy necessary files from digitraffic-ci
  cp "$DIGITRAFFIC_CI_PATH/aws/solr/schema.xml" "$BUILD_DIR/schema.xml"
  cp "$DIGITRAFFIC_CI_PATH/aws/solr/log4j2.xml" "$BUILD_DIR/log4j2.xml"

  # Build image
  docker build \
    -t "$IMAGE_NAME" \
    -f "$DIGITRAFFIC_CI_PATH/aws/docker/Dockerfile-catalog-solr" \
    --build-arg SOLR_SCHEMA_FILE=./schema.xml \
    --build-arg SOLR_LOG4J_FILE=./log4j2.xml \
    "$BUILD_DIR"

  echo "Solr image built successfully"
else
  echo "Solr image already exists, skipping build"
fi
