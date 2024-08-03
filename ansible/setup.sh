#!/bin/sh
ansible-galaxy collection install -r requirements.yml
ansible-playbook playbook.yml -K -vv
