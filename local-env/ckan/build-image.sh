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
IMAGE_NAME="local_catalog_ckan:latest"
if [[ $(docker image ls "$IMAGE_NAME" -q | wc -l) -eq 0 ]] || [[ "$BUILD_IMAGE" = 'build_image' ]]; then
  echo "Building CKAN image..."

  # Create build directory
  BUILD_DIR="./build"
  rm -rf "$BUILD_DIR"
  mkdir -p "$BUILD_DIR"

  # Copy necessary files from digitraffic-ci
  cp -R "$DIGITRAFFIC_CI_PATH/aws/ckan/setup" "$BUILD_DIR/setup"

  # Create and populate extensions directory
  mkdir -p "$BUILD_DIR/ckanext"
  cp -R ../../ext/ckanext-digitraffic_core "$BUILD_DIR/ckanext/ckanext-digitraffic_core"
  cp -R ../../ext/ckanext-entraid_authenticator "$BUILD_DIR/ckanext/ckanext-entraid_authenticator"
  cp -R ../../ext/ckanext-digitraffic_fluent "$BUILD_DIR/ckanext/ckanext-digitraffic_fluent"
  cp -R ../../ext/ckanext-digitraffic_opentelemetry "$BUILD_DIR/ckanext/ckanext-digitraffic_opentelemetry"

  # Build image
  docker build \
    -t "$IMAGE_NAME" \
    -f "$DIGITRAFFIC_CI_PATH/aws/docker/Dockerfile-catalog-ckan" \
    --build-arg SETUP_DIR=./setup \
    --build-arg CKANEXT_DIR=./ckanext \
    "$BUILD_DIR"

  echo "CKAN image built successfully"
else
  echo "CKAN image already exists, skipping build"
fi

# Build the local dev version on top of the main image
DEV_IMAGE_NAME="local_catalog_ckan_dev:latest"
if [[ $(docker image ls "$DEV_IMAGE_NAME" -q | wc -l) -eq 0 ]] || [[ "$BUILD_IMAGE" = 'build_image' ]]; then
  echo "Building CKAN dev image..."
  docker build -t "$DEV_IMAGE_NAME" .
  echo "CKAN dev image built successfully"
else
  echo "CKAN dev image already exists, skipping build"
fi

