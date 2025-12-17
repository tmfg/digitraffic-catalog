#!/usr/bin/env bash

# This script runs pytest tests for the ckanext-digitraffic_core extension inside a Docker container.
# The docker container must be running already. You may use the `start-local-ckan.sh` script to start the container.
# This script allows running all tests or specific tests based on provided arguments.
#
# Arguments:
#   $1 (optional) - Test file name relative to the `tests` directory inside the ckanext-digitraffic_core extension
#                   Example: "validators/test_dataset_validators.py"
#   $2 (optional) - Test function name within the specified file
#                   Example: "test_user_show_other"
#
# Examples:
#   Run all tests:
#   ./run-digitraffic-core-tests-on-docker.sh
#   Run all tests in a specific file:
#   ./run-digitraffic-core-tests-on-docker.sh auth/test_user_auth.py
#   Run a specific test function in a specific file:
#   ./run-digitraffic-core-tests-on-docker.sh auth/test_user_auth.py TestUserAuth::test_user_show_self

set -euo pipefail

TESTS_DIRECTORY="ckanext/digitraffic_core/tests"
TEST_FILE=
TEST_FUNCTION=

if [ -n "${1:-}" ]; then
    TEST_FILE="${TESTS_DIRECTORY}/${1}"
    shift
fi
if [ -n "${1:-}" ]; then
    TEST_FUNCTION="${1}"
    shift
fi

if [ -n "$TEST_FILE" ] && [ -n "$TEST_FUNCTION" ]; then
    PYTEST_ARGS="${TEST_FILE}::${TEST_FUNCTION}"
elif [ -n "$TEST_FILE" ]; then
    PYTEST_ARGS="${TEST_FILE}"
else
    PYTEST_ARGS="-rA ${TESTS_DIRECTORY}"
fi

# We need to install in editable mode to run the tests
docker exec datakatalogi-local-ckan-1 bash -c "cd ckanext/ckanext-digitraffic_core && \
pip uninstall -y ckanext-digitraffic-core 2>/dev/null || true && \
pip install -e ."

# Run tests as ckan user
docker exec -u ckan datakatalogi-local-ckan-1 bash -c "cd ckanext/ckanext-digitraffic_core && \
pytest --ckan-ini=test.ini ${PYTEST_ARGS}"
