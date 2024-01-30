# From the base image node
FROM node:latest as base
WORKDIR /usr/src/app

# Copy all the files from your file system to the container file system
COPY package*.json ./

# Install deps
RUN npm install

# Copy other files as well
COPY . .

# Install all dependencies
RUN npm run build

CMD [ "npm", "start" ]

