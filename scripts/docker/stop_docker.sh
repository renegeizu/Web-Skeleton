#!/bin/bash

# Imports
source ../utils/logs.sh
source ../utils/others.sh

# Functions

_stop_docker () {
    _log_info "Stopping Docker Services..."
    sudo systemctl disable docker.service
    sudo systemctl disable containerd.service
    _log_info "Stopped Docker Services"
}

# Main Code

_main_stop_docker() {
    _log_info "Stopping Docker..."
    _check_root
    _stop_docker
    _log_info "Stopped Docker"
    _return_successful
}