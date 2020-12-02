# Sights in California Server

<h4>This is the back-end server for the Sights in California.</h4>
<h4>Built using Node.js, Express, and PostgreSQL.</h4>
<h4>Testing was done using Chai and Supertest.</h4>
<h4>The server is currently deployed to Heroku.</h4>

<ul>
<li>Run 'npm run migrate' to create tables</li>
<li>'npm run dev' to run the server</li>
</ul>

<br />
<br />

<a href="https://sightsincali.donotle98.vercel.app/">Link to live site</a>

<br />
<br />

<h1>API Documentation</h1>
> GET '/api/login/'
<p>This route is used to create tokens for users logging in and signing up</p>
> GET '/api/login/:username
<p>Once the path is called the user's token will be compared to the token created, and if the token is correct, the user will be fetched</p>
> GET '/api/bookmarks
<p>Will retrieve all the bookmarks</p>
> POST '/api/bookmarks/'
<p>Post a bookmark needing just users first name and id of the sight</p>
> GET '/api/bookmarks/:first_name'
<p>Get bookmarks for a specific user</p>
> DELETE '/api/bookmarks/:sightid
<p>Delete the certain bookmark</p>
> GET '/api/sights/'
<p>Get all sight cards</p>
> POST '/api/sights'
<p>Post to the sight database needing only name, description, url</p>
> GET '/api/sight/:city'
<p>Get all sights by a certain city</p>
> POST '/api/users/'
<p>Add a user to the database only needing first name, city, username, and password</p>
> GET '/api/users/:username'
<p>Get user by username</p>

# Express Boilerplate!

This is a boilerplate project used for starting new projects!

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
