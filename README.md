# CGI 2024 Summer Internship homework

## Description

This project consists of a web application built with Next.js and a backend application built with Java Spring Boot.

## Table of Contents

- [Installation](#installation)
  - [Web Application (Next.js)](#running-the-web-application)
  - [Backend Application (Java Spring Boot)](#running-the-backend-application)
  - [Accessing The Website](#accessing-the-website)
- [My Experience](#my-experience)
- [Time Management](#time-management)

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
   
### Running The Web Application

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

### Running The Backend Application

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

### Accessing The Website

Open a web browser and head to [http://localhost:3000](http://localhost:3000) to access the application.

<br/>

## My Experience

When I first looked at the task, I found it interesting and felt it matched my skills. With experience in React and Java Spring Boot, I decided to use Next.js as the React framework. It offers built-in optimization for fonts, images, and server components. Since the task description was a bit vague, I assumed we didn't need to create a login system. Since it is for demo purposes only, I chose to have all the users of the application have the same userId without needing to sign up or sign in.

### How did it go?

I began by working on the backend of the application, trying to get all the necessary endpoints working. I tested these using Postman. I chose to use an MVC (model, view, controller) architecture, creating different controllers, services, and repositories for implementing logic and data access. Writing the backend of the application went quite smoothly, and soon my endpoints were working. I decided to use pagination as well, since sending back all the movies at once would not be a good idea. For the recommendation system, I simply counted how many movies of each genre the user has seen and then sorted the movies based on these movie genre counts. Within each genre, I also sorted the movies based on IMDb rating. If the user has not made any purchases, I return the list of all movies.

Then I moved onto the frontend. I designed components for movies and dropdown menus and implemented them on the landing page, where users can select movies by different filters. The webpage then retrieves these movies from the backend server and displays them to the user as pages that the user can look through. After I was done with the landing page, I moved onto the page where users can select seats. I designed the cinema room layout in Figma and imported the designs as SVGs into my project. After that was done, I implemented some logic for suggesting seats and making new purchases. I also tried to handle exceptions and data validation as gracefully as possible, showing error messages as needed.

For the data, I first tried looking into a public API that I could query, but I could not find a suitable free API, so I decided to use a public dataset instead and simply read in the data into the database when the application starts. I used a public Kaggle movie dataset that stored IMDb metadata about thousands of movies. I cleaned the DataFrame with pandas, kept only the necessary features, and reduced the dataset size to only 30 rows. I felt 30 would be enough to showcase the pagination as well.

### What I Would Do Differently

Since I was working on this homework in my free time alongside going to school, I ran into a bit of a time crunch and was not able to implement everything I would have wanted. Here are some things that could have been implemented with extra time, which would have improved the project even more:

1. Dockerizing the application for a smoother installation process. I could have created Dockerfiles for both the backend and frontend of the application and used a docker-compose.yml file to get the application running with only two commands.

2. Tests. Even though I somewhat tested the endpoints myself in Postman, I feel like writing simple unit and integration tests would have been good.

3. Securing the API endpoints. Since I do not have users in my application, I could have used simple API keys to protect the endpoints.

4. Adding a history page where users can see the purchases they have made.

<br/>

## Time Management

I worked on the project over a course of two weeks. The backend of the application was less time-consuming than the client-side. The project initialization for the backend was completed in about 6 hours. In comparison, implementing the frontend took about 10 hours.

The most difficult and interesting part of the backend was implementing the movie filtering system along with pagination. Additionally, the movie recommendation system was also enjoyable to work on and implement.

On the frontend application, the most time-consuming tasks were implementing the dropdowns for selecting different filters on the main page and the seat selection on the movie suggestion page.

