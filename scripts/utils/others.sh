#!/bin/bash

# Imports
source logs.sh

# Functions

_check_root() {
    if [[ $USER != root ]]
    then
        _log_error "Error: You must have Root Privileges"
        _return_error
    else
        _log_info "Successful Root Privileges"
    fi
}

_return_successful () {
    exit 0
}

_return_error () {
    exit 1
}

_update_system () {
    _log_info "Updating System..."
    sudo apt update
    sudo apt upgrade --yes
    sudo apt install build-essential --yes
    sudo apt autoremove --yes
    _log_info "Updated System"
}