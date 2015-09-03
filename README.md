# generator-skyko

Generates a starting point for a Knockout application.
Now with added VaVaVoom from Mark Lowe @ Sky Broadcast Apps

Once installed you can install the tool using
	npm install yo -g
	npm install generator-skyko -g

To scaffold an application into a new directory <appdir>
	mkdir <appdir>
	cd <appdir>
	yo skyko

Yeoman will then make the framework of the single page application for you
All source for the application is in the "./src/" directory

You may also scaffold two further types of object in the framework
	yo skyko:component <name>
	yo skyko:page <name>

These commands will make named components and pages in the respective source directories
More about these soon, when they're working !
