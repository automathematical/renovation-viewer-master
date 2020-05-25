# Renovation Viewer

## Building Informatics :classical_building: :computer:

Masters year 2020 - Ghent University project - Advanced Topic <br/>
Building Informatics project with MERN-stack (MongoDB / Express.js / React.js / Node.js)

**For more information check out our website** [renovation viewer](https://automathematically.github.io/renovation-viewer-master/)

## How to get started with node.js

To get started (if you haven't already) you will need to install the Node.js LTS platform on your pc [Node.js](https://nodejs.org/en/)

## How to get started with the project

This project is built using [visual studio code](https://code.visualstudio.com/), so you'll need to install it first

1. Clone or download
2. Open renovation-viewer in visual studio code
3. open a new terminal in vscode and:

initialize the project with:

`npm install`

deploy server and client:

`npm run dev`

4. Make a new folder named `config` and add a new file `default.json`</br>
   renovation-viewer</br>
   |- config</br>
   |-|- default.json</br>
5. in `default.json` Configure your mongoDB link and JWToken</br>
   Example code snipped:

```
{
  "mongoURI": "mongodb+srv://[YOURNAME:YOURPASSWORD]@mernapp-megzh.mongodb.net/test?retryWrites=true&w=majority",
  "jwtSecret": "[YOURPASSWORD]"
}
```

## Additional Resources

[Github](https://github.com/) - hosting for software development version control using Git

[GIT](https://git-scm.com/) - open source distributed version control system

[mongoDB](https://www.mongodb.com/) - NoSQL database

[Node.js](https://nodejs.org/en/) - open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser

[mongoose](https://mongoosejs.com/) - elegant mongoDB object modeling for node.js

[ReactJS](https://reactjs.org/) - open-source Javascript library for building user interfaces

[Postman](https://www.postman.com/) - a collaboration platform for API development

[NPM](https://www.npmjs.com/) - npm is a package manager for the JavaScript programming language

[react-image-annotation](https://www.npmjs.com/package/react-image-annotation) - An infinitely customizable image annotation library built on React

[traversy media](https://www.traversymedia.com/) - tutorials on web development

## License

MIT see [License](/License)
