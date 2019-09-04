#!/bin/bash

sudo bash -c "cat > /var/lib/connman/eduroam.config  << EOF
[service_eduroam]
Type = wifi
Name = eduroam
EAP = peap
Phase2 = MSCHAPV2
CACertFile = /etc/ssl/certs/GlobalSign_Root_CA.pem
EOF"

sudo bash -c "cat > /var/lib/connman/UWS.config  << EOF
[service_UWS]
Type = wifi
Name = UWS
EAP = peap
Phase2 = MSCHAPV2
CACertFile = /etc/ssl/certs/GlobalSign_Root_CA.pem
EOF"
