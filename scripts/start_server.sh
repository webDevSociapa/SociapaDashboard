#!/bin/bash
cd /home/ec2-user/SociapaDashboard
pm2 stop SociapaDashboard || true
pm2 start npm --name "SociapaDashboard" -- start
pm2 save
