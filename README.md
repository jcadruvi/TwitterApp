# Twitter App

Follow these instructions to get the project up and running:

1) Make sure you have node installed. If you don't you can download it from here:
   https://nodejs.org/en/download/
2) Open up a terminal and go to the folder that has this project.
3) Type in:
    $ npm install
4) Make sure you have bower installed globally. If you do not you can install it via npm by the following:
    $ npm install -g bower
5) Type in:
    $ bower install
6) Make sure you have gulp installed globally. If you do not you can install it via npm by the following:
    $ npm install -g gulp
7) Start the node server via the following:
    $ gulp nodemon
8) Open up another terminal and browse to this folder. Compile the client files via the following:
    $ gulp dev
9) Open up a browser and go to localhost:8080

This application uses Twitter's application-user authentication method. What this means is that you need to go to
your twitter account and add the application. This will create an API Key and API Secret which the application
can use to get the tweets for your account. In order to do this you need to go to the following URL:

https://apps.twitter.com/

Then click the create app and fill out the fields. Once you have completed this you will be redirected to a page
for the application. If you click on the Keys and Access Tokens page you will see the fields:

Consumer Key (API Key)
Consumer Secret (API Secret)

You will need to take the values of those fields and add them into the config file so the application can
call the Twitter API to reveal your tweets.

