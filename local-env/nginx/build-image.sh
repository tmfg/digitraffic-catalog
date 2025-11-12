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
IMAGE_NAME="local_catalog_nginx:latest"
if [[ $(docker image ls "$IMAGE_NAME" -q | wc -l) -eq 0 ]] || [[ "$BUILD_IMAGE" = 'build_image' ]]; then
  echo "Building Nginx image..."

  # Create build directory
  BUILD_DIR="./build"
  rm -rf "$BUILD_DIR"
  mkdir -p "$BUILD_DIR/setup"
  mkdir -p "$BUILD_DIR/custompages"

  # Copy necessary files from digitraffic-ci
  cp "$DIGITRAFFIC_CI_PATH/aws/nginx-catalog/setup/server.variables.template" "$BUILD_DIR/setup/server.variables.template"
  cp "$DIGITRAFFIC_CI_PATH/aws/nginx-catalog/setup/errorpages.conf" "$BUILD_DIR/setup/errorpages.conf"
  cp "$DIGITRAFFIC_CI_PATH/aws/nginx-catalog/setup/nginx.conf" "$BUILD_DIR/setup/nginx.conf"
  cp "$DIGITRAFFIC_CI_PATH/aws/nginx-catalog/setup/otel.conf.local" "$BUILD_DIR/setup/otel.conf.local"
  cp "$DIGITRAFFIC_CI_PATH/aws/nginx-catalog/setup/security_headers.conf" "$BUILD_DIR/setup/security_headers.conf"
  cp "$DIGITRAFFIC_CI_PATH/aws/nginx-catalog/setup/server.conf.local" "$BUILD_DIR/setup/server.conf.local"
  cp -R "$DIGITRAFFIC_CI_PATH/aws/nginx-catalog/custompages/"* "$BUILD_DIR/custompages/"

  # Build image
  docker build \
    -t "$IMAGE_NAME" \
    -f "$DIGITRAFFIC_CI_PATH/aws/docker/Dockerfile-catalog-nginx" \
    --build-arg VARIABLES_TEMPLATE_FILE=./setup/server.variables.template \
    --build-arg ERROR_PAGES_CONFIG_FILE=./setup/errorpages.conf \
    --build-arg NGINX_CONFIG_FILE=./setup/nginx.conf \
    --build-arg OTEL_CONFIG_FILE=./setup/otel.conf.local \
    --build-arg SECURITY_HEADERS_CONFIG_FILE=./setup/security_headers.conf \
    --build-arg SERVER_CONFIG_FILE=./setup/server.conf.local \
    --build-arg CUSTOM_PAGES_DIR=./custompages \
    "$BUILD_DIR"

  echo "Nginx image built successfully"
else
  echo "Nginx image already exists, skipping build"
fi
