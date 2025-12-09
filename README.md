# D&G Project

A full end-to-end VPN provisioning system built using:

- OpenVPN on an AWS EC2 Ubuntu server  
- EasyRSA automated certificate generation  
- Node.js API to generate client configurations  
- Netlify-hosted front-end where users download their .ovpn  
- Wireshark analysis verifying encrypted UDP traffic  

This repository contains all non-sensitive code used to build the project.

## Folder Structure

- demonstration/ - Images showing the project working
- server/ — Node.js API + automation script  
- website/ — Front-end static site (Netlify)  
- openvpn-server-config/ — Sanitized OpenVPN server config  
- diagrams/ — Topology and packet-flow diagrams  
- report/ — Final PDF for submission  

# OpenVPN Configuration (Sanitized)

This folder contains sanitized example configuration files used in the project.  
**No private keys, certificates, or secrets are included.**

## Files Included

### server.conf
A redacted OpenVPN server configuration file showing:
- Networking setup
- DNS push settings
- Cipher suites
- TLS configuration (paths only)
- Routing rules

### What is NOT included
The following sensitive files are intentionally excluded:
- `server.key`
- `ca.key`
- `tls-crypt.key`
- Any `.crt` files generated for clients
- `/pki/private/*`
- Real IP or domain information

## Actual Deployment Notes
The real server runs on an AWS EC2 Ubuntu instance.

This folder is for reference only.  
Actual operational config lives securely on the EC2 instance.


This is a networking project to practice using AWS and API's. 
Private keys and real certificates **are NOT included** for security reasons.
