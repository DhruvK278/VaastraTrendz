FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy everything else
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Serve static files since next.config.js uses output: 'export'
RUN npm install -g serve
CMD ["serve", "-s", "out", "-l", "3000"]
