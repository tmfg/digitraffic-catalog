#!/usr/bin/env bash
set -euo pipefail

BUILD_IMAGE="${1:-}"

cd "$(dirname "${BASH_SOURCE[0]}")"

# Check if image should be built
IMAGE_NAME="local_catalog_postgresql:latest"
if [[ $(docker image ls "$IMAGE_NAME" -q | wc -l) -eq 0 ]] || [[ "$BUILD_IMAGE" = 'build_image' ]]; then
  echo "Building PostgreSQL image..."

  # Build image (PostgreSQL is local to this project)
  docker build -t "$IMAGE_NAME" .

  echo "PostgreSQL image built successfully"
else
  echo "PostgreSQL image already exists, skipping build"
fi
