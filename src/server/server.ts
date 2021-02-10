import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as path from 'path'; // path comes with express
import * as passport from 'passport';  
import routes from './routes';
import './middlewares/passport-strategies'; // run this file after as the server runs and compiles. think of it like a useEffect. this comes from typescript

const app = express();

app.use(helmet()); // this should be at the top so everything else filters through it
app.use(compression()); // everything after compression needs to be compressed
app.use(cors());
app.use(morgan('dev')); // every incoming route passes through morgan so it logs all activity across the server
app.use(passport.initialize()); // must be initialized above the routes // this prepares our express application to utilize passport as if it was an express middleware. it does nothing on its own out of the box
app.use(express.static('public'));
app.use(express.json()); // body parser
app.use(routes); 
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html'))); // our code is actually running from dist/server.js
// tells the server: if a route doesn't start with /api, get out of the way, ignore it, it's front end
// you have to add this in in a SPA (single page application)
// it allows react-router to do its job

const port = process.env.PORT || 3000; 
// If there is an environment variable already provided for us, use that. Otherwise, default to 3000
// That way, we can have localhost: 3000 on our computers, but if this server deploys somewhere else like herokku or aws, then you can be provided a port by that server
// most likely, another server already has port 3000 taken up by their own devtools or someone else's code
app.listen(port, () => console.log(`Server listening on port: ${port}`));
