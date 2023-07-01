#!/bin/bash

# Imports - Utils
source utils/logs.sh
source utils/others.sh

# Imports - Docker
source docker/install_docker.sh
source docker/remove_docker_images.sh
source docker/start_docker.sh
source docker/stop_docker.sh
source docker/uninstall_docker.sh
source docker/verify_docker.sh

# Functions

_show_menu() {
	clear
    _log_info "======================="
    _log_info "======= Options ======="
    _log_info "======================="
    _log_warning "1. Install Docker"
    _log_warning "2. Uninstall Docker"
    _log_warning "3. Verify Docker"
    _log_warning "4. Start Docker"
    _log_warning "5. Stop Docker"
    _log_warning "6. Remove Images"
    _log_warning "7. Exit"
    _log_info "======================="
}

_read_option() {
	local option
	read -p "Choose Option (1-7): " option
	case $option in
		1) clear; _main_install_docker; _return_successful;;
		2) clear; _main_uninstall_docker; _return_successful;;
		3) clear; _main_verify_docker; _return_successful;;
		4) clear; _main_start_docker; _return_successful;;
        5) clear; _main_stop_docker; _return_successful;;
        6) clear; _main_remove_docker_images; _return_successful;;
		7) clear; _return_successful;;
        *) _log_error "Error! Enter a Valid Option" && sleep 1
	esac
}

# Main Code
while true
do
	_show_menu
	_read_option
done