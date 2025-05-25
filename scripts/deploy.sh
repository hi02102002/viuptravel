#!/bin/bash

set -e # Exit on error

echo "Starting deployment..."

sudo mkdir -p ~/apps/viuptravel

echo "📦 Pulling latest Docker images..."
sudo docker compose pull

echo "🔁 Recreating containers..."
sudo docker compose up -d --force-recreate

echo "🧹 Cleaning up unused Docker resources..."
sudo docker system prune -f

echo "Deployment completed successfully!"
