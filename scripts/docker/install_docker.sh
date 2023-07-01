#!/bin/bash

# Imports
source ../utils/logs.sh
source ../utils/others.sh

# Functions

_create_docker_group () {
    _log_info "Creating Docker Group..."
    sudo groupadd docker
    sudo usermod -aG docker $USER
    sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
    sudo chmod g+rwx "$HOME/.docker" -R
    sudo chown root:docker /var/run/docker.sock
    sudo chmod 666 /var/run/docker.sock
    _log_warning "Restart the Terminal to Finish the Process"
    _log_info "Docker Group Created"
}

_install_docker_compose () {
    _log_info "Installing Docker Compose..."
    sudo apt-get update
    sudo apt-get install docker-compose docker-compose-plugin --yes
    _log_info "Docker Compose Installed"
}

_install_docker_engine () {
    _log_info "Installing Docker"
    sudo apt update
    _log_info "Fixing the GPG Error..."
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    sudo apt update
    _log_info "Fixed GPG Error"
    sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin --yes
    _log_info "Installed Docker"
}

_set_up_docker_repository () {
    _log_info "Setting Up Docker Directory..."
    sudo apt update
    sudo apt install apt-transport-https ca-certificates curl gnupg gnupg-agent lsb-release software-properties-common --yes
    _log_warning "Adding GPG Key..."
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    _log_warning "Added GPG Key"
    _log_info "Setted Up Docker Directory"
}

_uninstall_old_docker_versions () {
    _log_info "Removing Old Docker Versions..."
    sudo apt remove docker docker-engine docker.io containerd runc --yes
    _log_info "Removed Old Docker Versions"
}

# Main Code

_main_install_docker() {
    _log_info "Starting Docker Installation and Configuration..."
    _check_root
    _update_system
    _uninstall_old_docker_versions
    _set_up_docker_repository
    _install_docker_engine
    _log_info "Docker Installed and Configured"
    _log_info "Starting Docker Compose Installation and Configuration..."
    _install_docker_compose
    _log_info "Docker Compose Installed and Configured"
    _log_info "Configure Docker Permissions..."
    _create_docker_group
    _log_info "Docker Permission Configured"
    _return_successful
}