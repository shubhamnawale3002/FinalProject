**MoviesWiki Web App**

Welcome to MoviesWiki.com! This repository serves as the base environment for the MoviesWiki web app. The MoviesWiki web app provides an interactive platform for users to browse and filter movies. It includes features such as language filtering, genre filtering, and decade-based filtering. The setup includes a starter HTML page, a JavaScript file, and sample JSON data to facilitate your development process. We've integrated a lightweight web server, lite-server, and a user-friendly CSS library, Semantic UI, to enhance your experience.

**Setup**
**Prerequisites**
Make sure the following software is installed on your machine:

Node.js
Visual Studio Code
git
Preferred web browser (Chrome is recommended, but Firefox should also work)
Configure Project
Open a command prompt and clone the repository:

git clone https://github.com/shubhamnawale3002/FinalProject.git
Open the project folder in Visual Studio Code using File > Open Folder (Windows) or File > Open (Mac).

Open the integrated terminal in VS Code and run:

npm install
This command installs project dependencies into the node_modules folder.

Running the Project
Execute the following command in the terminal:

npm start
This will start the lite-server on port 3000 and open the project in your default browser.

The server automatically watches for changes in HTML, JavaScript, and CSS files, refreshing the browser tab for a seamless development experience.

Ensuring Setup Success
Open the browser's developer console to check for errors and verify the successful import of data.
Typing into the text box should display the entered text below it.
Clicking the button should log a JavaScript object in the console.
Understanding Starter Code & Data Files
index.html
References index.js and styles.css.
Imports Semantic UI CSS from a CDN for UI enhancement.
Contains a text field and button using methods within index.js.
index.js
Dynamically imports ./src/moviesPlay.js, which exports data arrays (movies, hindiMovies, languages, countries, genres) and a getCounts() method.
Defines sample methods used by index.html.
Data Files (movies.js, hindiMovies.js)
Export movie-related data arrays (e.g., movies, hindiMovies, languages, countries, genres).
Data structure details are provided as comments in the files.
**Acknowledgements**
Movies data sourced from Kaggle and simplified for this learning environment.
Languages, countries, and genres data sourced from themoviedb.
Feel free to modify and build upon this foundation for your project. If you have any questions or need assistance, don't hesitate to reach out. Happy coding!
