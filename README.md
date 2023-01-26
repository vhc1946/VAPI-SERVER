VAPI repository

This is an http server meant to handle a collection of static files and can be setup as a simple website or a place to hold resource files.

-SETUP-

1) Website:
A simple set of client pages can be setup by using the public folder as the root. There the files can be requested and served by their full paths. It may be more desirable to serve the pages without the extensions included. For this the Controllers folder can be setup with the pages to serve. Controllers will hold .html files by default (only option available), but could be setup to serve other types of content.


2) Repository: If only to serve resource files.
A Repository can be setup by including a public file in the root. From there the repo can be structured as needed. Public is always "active" to the server and is checked first


-START-
Once the correct branch is checked out, ensure the appropriate node modules are installed. The server can then be started from the command line. The startup does not change if the repository needs to be run in a network of servers.

at the root:
- npm install - (to ensure the modules are there)
- npm run repo - (to start the server)

By default the server listens on 4000, but this can be changed in the server.js.
