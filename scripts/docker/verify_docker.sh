#!/bin/bash

# Imports
source ../utils/logs.sh
source ../utils/others.sh

# Functions

_verify_docker_compose () {
    _log_info "Verifying Docker Compose Version..."
    docker compose version
    _log_info "Verified Docker Compose Version"
}

_verify_docker_group () {
    _log_info "Verifying Docker Group..."
    docker run hello-world
    _log_info "Verified Docker Group"
}

_verify_docker_installation () {
    _log_info "Verifying Docker..."
    sudo docker run hello-world
    _log_info "Verified Docker..."
}

# Main Code

_main_verify_docker() {
    _log_info "Verifying Docker Installation and Configuration..."
    _verify_docker_compose
    _verify_docker_group
    _log_info "Verified Docker Installation and Configuration"
    _return_successful
}