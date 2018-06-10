# ES6 Javascript Starter

- [ES6 Javascript Starter](#es6-javascript-starter)
  - [Dependencies](#dependencies)
  - [How to start a project](#how-to-start-a-project)
  - [Structure](#structure)
    - [Style (SCSS)](#style-scss)
    - [Scripts (JS)](#scripts-js)
    - [Gulp Tasks](#gulp-tasks)
    - [Assets](#assets)
    - [Public directory](#public-directory)

## Dependencies

To use this starter, you must install gulp as a global NPM package.  

I recommend using Yarn as it has a better dependency lock handling.

```bash
npm install -g gulp
# OR
yarn global add gulp
```

## How to start a project

1. Clone this repository. (`git clone git@github.com:Cream-IO/starter_pack_static_WEB2020_hetic.git {YOUR-PROJECT-NAME}`)
2. Move into the created directory. (`cd {YOUR-PROJECT-NAME}`)
3. Remove the .git directory. (`rm -rf .git`)
4. Remove the starter README file. (`rm -rf README.md`)
5. Initialize a new git repository. (`git init`)
6. Add your own git remote. (`git remote add {YOUR-REPOSITORY URL}`)
7. Install the dedency packages. (`yarn {OR} npm install`)

## Structure

### Style (SCSS)

All your SCSS code should be in the different directories under `src/scss` and files must be imported in `master.scss`.  

Linting rules are configured in `.sass-lint.yml`. (You should use a plugin handling `sass-lint` in your editor).

### Scripts (JS)

All your SCSS goes in the `src/js` directory and should be imported using ES6 import in `app.js`.

The starter is configured to handle ES6/ES2015 code and use webpack to polyfill ES6 features in the final minified JS file.

Linting rules are configured in `.eslintrc.js`. (You should use a plugin handling `ESLint` in your editor).

### Gulp Tasks

You can start a gulp task by typing in your terminal `gulp {taskname}`.

Following tasks are available in the `gulpfile.js` :

- scss (Builds `src/scss/master.scss` to `public/css/master.min.css`)
- scripts (Builds `src/js/app.js` to `public/js/app.min.js`)
- build (Builds everything, equivalent to scss & scripts tasks together)
- cssmetrics (Generates metrics about css in the `metrics` directory, you must create the directory `mkdir metrics`)
- serve (Builds and starts a web server on localhost:12000)
- watch (Watches SCSS, HTML & JS and rebuilds on modification)
- default (Builds everything, watches it, starts a web server on port 3000, opens the browser and refreshes at every file modification)

The default gulp task can also be starter with `yarn start`.

### Assets

You must place your assets (images, videos, sounds... etc) in the `public` directory.

### Public directory

After running the `gulp build` task, the public directory contains the final version of your application.  
You can upload the content of this folder where you want to.