import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as uuid from "uuid";
import * as session from "express-session";
import fs = require("session-file-store");
import * as passport from "passport";
import * as local from "passport-local";

import { Routes } from "./routes/routes";

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://kolontaevsky:1996seriy@ds125263.mlab.com:25263/medcard';
    private LocalStrategy = local.Strategy;

    private options: fs.Options = {
        path: "./tmp/sessions/",
        logFn: (a: string) => {

        }
    };

    private FileStore = fs(session);

    constructor() {
        this.app = express();
        this.authSetup();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(session({
            genid: (req) => {
                console.log('Setting session...', req.sessionId);
                return uuid();
            },
            store: this.FileStore(this.options),
            secret: 'secret',
            resave: false,
            saveUninitialized: true
        }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

    private authSetup(): void {
        const user = {id: 123, email: 'emailll', password: 'pass'};
        passport.use(new this.LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            console.log('Inside local strategy callback');
            if (email === user.email && password === user.password) {
                console.log('Local strategy returned true');
                return done(null, user);
            }
        }));
        passport.serializeUser((user, done) => {
            console.log('Save user to session');
            done(null, user.id);
        });
    }
}

export default new App().app;