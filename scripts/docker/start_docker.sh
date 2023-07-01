#!/bin/bash

# Imports
source ../utils/logs.sh
source ../utils/others.sh

# Functions

_start_docker () {
    _log_info "Starting Docker Services..."
    sudo systemctl enable docker.service
    sudo systemctl enable containerd.service
    _log_info "Started Docker Services"
}

# Main Code

_main_start_docker() {
    _log_info "Starting Docker..."
    _check_root
    _start_docker
    _log_info "Started Docker"
    _return_successful
}