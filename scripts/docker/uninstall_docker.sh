#!/bin/bash

# Imports
source ../utils/logs.sh
source ../utils/others.sh

# Functions

_uninstall_docker () {
    _log_info "Removing Docker..."
    sudo apt purge docker-ce docker-ce-cli containerd.io docker-compose-plugin --yes
    sudo rm -rf /var/lib/docker
    sudo rm -rf /var/lib/containerd
    _log_info "Removed Docker"
}

# Main Code

_main_uninstall_docker() {
    _log_info "Uninstalling Docker..."
    _check_root
    _uninstall_docker
    _log_info "Uninstalled Docker"
    _return_successful
}