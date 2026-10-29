#!/usr/bin/env bash
# shellcheck shell=busybox
# Local dev only: apply the digitraffic_core database migrations on every start.
ckan -c "${CKAN_INI}" db upgrade -p digitraffic_core
