#!/bin/bash

# Imports
source ../utils/logs.sh
source ../utils/other.sh

# Main Code

_main_remove_docker_images() {
    _log_info "Removing Docker Images..."
    _check_root
    sudo systemctl restart docker.socket docker.service
    docker rm -vf $(docker ps -aq)
    docker rmi -f $(docker images -aq)
    _log_info "Removed Docker Images"
    _return_successful
}