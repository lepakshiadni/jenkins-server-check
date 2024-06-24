# # Use the official Node.js image as the base image
# FROM node:alpine

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the application files
# COPY . .

# # Expose the port your app runs on
# EXPOSE 3000
# EXPOSE 80

# # Start the application
# CMD ["npm", "start"]
# Use Node.js as base image
FROM node:alpine3.18 as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set the build argument for the API URL
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL} 


# Build the React app
RUN npm run build

# Display the contents of /app/build
RUN ls -al /app/build
# COPY default.conf /etc/nginx/conf.d/default.conf
# Stage 2: Serve the React app with a lightweight HTTP server
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html 
RUN rm -rf *
# Copy the built app from the previous stage
COPY --from=builder /app/build .



COPY default.conf /etc/nginx/conf.d/default.conf 
# Expose port 80 to the outside world
# EXPOSE 8080
EXPOSE 80
EXPOSE 3000
# Start nginx server
CMD ["nginx", "-g", "daemon off;"]


# # Use an official Node.js runtime as the base image
# FROM node:alpine3.18 AS build 

# ARG REACT-APP-BASEURL
# ARG BACKEND_URL 

# ARG REACT-APP-BASEURL=REACT-APP-BASEURL
# ARG BACKEND_URL=BACKEND_URL  
# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the React app
# RUN npm run build
# #--------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>--------------------------------->>>>>>>>>>>>>>>> 


# FROM nginx:1.23-alpine 
# WORKDIR /usr/share/nginx/html 
# # RUN rm -rf * 
# COPY --from=build /app/build .
# EXPOSE 80 
# ENTRYPOINT ["nginx", "-g", "daemon off;" ]

