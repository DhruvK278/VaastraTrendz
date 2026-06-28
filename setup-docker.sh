#!/bin/bash
set -e

echo "🐳 Starting Docker setup for Fedora..."

# 1. Remove old versions of Docker if they exist
echo "🧹 Removing old Docker versions (if any)..."
sudo dnf remove -y docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine || true

# 2. Install required packages
echo "📦 Installing dnf-plugins-core..."
sudo dnf -y install dnf-plugins-core

# 3. Add the Docker CE repository
echo "🔗 Adding Docker repository..."
sudo dnf config-manager addrepo --from-repofile=https://download.docker.com/linux/fedora/docker-ce.repo

# 4. Install Docker Engine, CLI, containerd, and plugins (including Compose)
echo "🚀 Installing Docker Engine and Docker Compose..."
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 5. Start and enable Docker service
echo "⚡ Starting and enabling Docker service..."
sudo systemctl enable --now docker

# 6. Add current user to the 'docker' group
echo "👤 Adding user $USER to the docker group..."
sudo usermod -aG docker $USER

echo "✅ Docker setup is complete!"
echo "⚠️  IMPORTANT: You must log out and log back in (or restart your terminal) for the group changes to take effect."
echo "   After logging back in, you can start your project with:"
echo "   docker compose up --build -d"
