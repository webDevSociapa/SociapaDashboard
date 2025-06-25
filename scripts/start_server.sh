#!/bin/bash
cd /home/ec2-user/SociapaDashboard
pm2 stop sociapa-dashboard || true
pm2 start npm --name "sociapa-dashboard" -- start
pm2 save
