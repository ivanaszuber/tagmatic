# Tagmatic - AngularJS + Python/Flask

## Description

Tagmatic is a simple **project management app** for managing teams and projects. It has a nice interface for adding team members, projects, tasks, milestones, etc. The *interactive board* enables creation of custom columns (perfect for agile development), easy adding, editing and deleting tasks on the board, as well as dragging & dropping tasks to different columns (eg. from In Progress to Done).

Dashboard contains various reports displaying sprint, project and team progress (see screenshots at the bottom).

This is **version 0.0.1** of the app, meaning there are many more features to come. The demo is available at http://ivanaszuber.github.io/tagmatic/demo and contains *some* of the features.

**Source code is located in the `app` folder. Each component is located in its own folder.**

## Technology Used

Tagmatic is an **AngularJS** app conecting to the **Flask** backend which implements the Web service API. The backend is available at  https://github.com/ivanaszuber/tagmatic-backend.

Other libraries used include: **RequireJS**, **angular-ui-router**, **angular-ui-grid**, **d3**, **c3**, **lodash**, **karma**, **jasmine**... See bower.json for the full list of dependencies.

## Installation

If you'd like to install **Tagmatic** locally checkout the `tagmatic-backend` repository, install its requirements and create the database with the following commands:

```
git clone git@github.com:ivanaszuber/tagmatic-backend.git tagmatic-backend/

cd tagmatic/backend/server

pip3 install -U -r requirements.txt  # install Python dependencies

python3 db_create.py #create the database

python3 run.py #run the server on localhost:5005

```

Checkout `tagmatic-frontend` and install it's dependencies with the following commands:

```
git clone git@github.com:ivanaszuber/tagmatic-frontend.git tagmatic-frontend/

cd tagmatic-frontend/config

bower install
```

## Build Script

The build script is available in `grunt-tasks`. To create the build directory run the following

```
cd ..

cd grunt/tasks

npm install  

grunt

```

This will run the Gruntfile.js and:

- concatenate all .js and .html files into a single .js file, 
- copy all necessary lib .js, .css and font files
- minify all those files
- append a hash to every file
- and rename all references to those files so that they point to the correct hashed version


After the build is finished, new files will be available at `tagmatic-frontend/build`

## Testing

To run unit tests install the dependencies by running:

```
cd tagmatic-frontend

npm install
```
Start the karma server. This will execute all tests under the `tagmatic-frontend/test` folder.

## Screenshots

Here are some screenshots of the app. You can also check out the demo at http://ivanaszuber.github.io/tagmatic/demo

### Board

![](/demo/img/Tagmatic1.PNG)

### Dashboard

![](/demo/img/Tagmatic2.PNG)

### Team Page

![](/demo/img/Tagmatic3.PNG)

### Create New Tag

![](/demo/img/Tagmatiic4.PNG)

### Create New Task

![](/demo/img/Tagmatic5.PNG)
