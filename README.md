generator-skyko
===============
Generates a starting point for a Knockout application.
Now with added VaVaVoom from Mark Lowe @ Sky Broadcast Apps

Installing
----------
You may install the tool using the following method:

>`	npm install yo -g`
>`	npm install generator-skyko -g`

Using
-----
To scaffold an application into a new directory *appdir*
>`	mkdir __appdir__`

>`	cd __appdir__`

>`	yo skyko`

Yeoman will then make the framework of the single page application for you
All source for the application is in the *"./src/"* directory

You may also scaffold two further types of object in the framework

>`	yo skyko:component __name__`

>`	yo skyko:page __name__`

These commands will make named components and pages in the respective source directories
More about these soon, when they're working !
