# 1. Base image
FROM node:22.17.0-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json & package-lock.json
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy source code
COPY . .

# 6. Expose port backend
EXPOSE 3001

# 7. Run dev server
CMD ["npm", "run", "server"]
