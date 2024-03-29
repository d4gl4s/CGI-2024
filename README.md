# CGI 2024 Summer Internship homework

## Description

This project consists of a web application built with Next.js and a backend application built with Java Spring Boot.

## Table of Contents

- [Installation](#installation)
  - [Web Application (Next.js)](#user-content-web-application-nextjs)
  - [Backend Application (Java Spring Boot)](#backend-application-java-spring-boot)
  - [Accessing The Application](#accessing-the-application)
- [My Experience](#contributing)
- [Time management](#time-management)

## Installation

To use this project, follow these steps:

1. Clone the repository to your local machine:

   ```  
    git clone https://github.com/d4gl4s/CGI-2024.git
   ```

2. Navigate to the project directory:
  
   ```
    cd CGI-2024
    ```
   
### Running The Web Application (Next.js)

1. Navigate to the 'web' directory:
   
   ```
   cd web
   ```
   
2. Install dependencies:
   
   ```
   npm install
   ```
   
3. Run the development server:
   
   ```
   npm run dev
   ```

<br/>

### Running The Backend Application (Java Spring Boot)

To install and run the backend application, you can follow one of the following methods:

<br/>

**Method 1: Using IDE with Maven Support**

1. Open your preferred IDE (e.g., IntelliJ IDEA, Eclipse) with Maven support.
2. Import the backend directory of the project.
3. Build and run the project from within your IDE.

<br/>

**Method 2: Using The Command Line**

To install and run the backend application through the command line, you'll need Maven and Java Development Kit (JDK) installed on your machine. Follow these steps:

1. Navigate to the 'backend' directory:
   
   ```
   cd CGI-2024/backend
   ```
   
2. Build the project using Maven:

   ```
   mvn clean install
   ```
  
3. Run the application:

   ```
   mvn spring-boot:run
   ```
<br/>

### Accessing The Application

Open a web browser and head to [http://localhost:3000](http://localhost:3000) to access the application.

## My Experience

## Time Management

I worked on the project over a course of two weeks. The backend of the application was less time-consuming than the client-side. The project initialization for the backend was completed in about 6 hours. In comparison, implementing the frontend took about 10 hours.

The most difficult and interesting part of the backend was implementing the movie filtering system along with pagination. Additionally, the movie recommendation system was also enjoyable to work on and implement.

On the frontend application, the most time-consuming tasks were implementing the dropdowns for selecting different filters on the main page and the seat selection on the movie suggestion page.

