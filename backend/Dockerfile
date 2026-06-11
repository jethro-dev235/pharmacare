FROM node:20-slim

# Install system dependencies required by Prisma's query engine binary
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        openssl \
        libssl-dev \
        ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies first (layer-cache friendly)
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Generate Prisma client with the correct native binary
RUN npx prisma generate

EXPOSE 8080

CMD ["npm", "start"]