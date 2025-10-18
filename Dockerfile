FROM node:14.21.3

WORKDIR /usr/src/app

# Copy package files
COPY package*.json .npmrc ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
