FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 9091

# Creates a "dist" folder with the production build
RUN npm run build

# Run unit tests
RUN npm run test

# Start the server using the production build
CMD [ "npm", "start" ]