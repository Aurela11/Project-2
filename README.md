# Task Management Backend
This backend service provides functionality for a task management system.

-Clone the project git clone 
   https://github.com/Aurela11/Project-2.git

-Open terminal and navigate to the project 
   cd Project-2

-Install packages 
   npm install (npm i)

-Migrate database 
 npx prisma migrate dev"initial"
 npx prisma deploy

-Start the project 
npm run start
----------------------------------------------------------------

Test the project requests with Postman, for example:

Make a POST request
Enter Url: http://localhost:3000/api/tasks/
In body do the JSON format and give the necessary parameters 
{
    "title":"Task 1",
    "description":"Backend development tasks for the project"
}


#Author: Aurela Gashi