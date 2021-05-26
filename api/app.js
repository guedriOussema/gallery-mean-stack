const express = require('express');
const cors = require('cors');
const app = express();
var multer  = require('multer')
var upload = multer()

require('./db/mongoose');

const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

// Load in the mongoose models
const { User,Image, Favorite, Like } = require('./db/models');

// Load middleware

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// CORS MIDDLEWARE
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, HEAD, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, _id, x-access-token, x-refresh-token');

    res.header('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');
    
    next();
})


// check whether the request has a valid JWT access token
const authenticate = (req, res, next) => {
    // grab the access token from the request header
    const accessToken = req.header('x-access-token');

    // verify the JWT
    jwt.verify(accessToken, User.getJWTSecret(), (error, decoded) => {
        if (error) {
            // there was an error
            // jwt is invalid - DO NOT AUTHENTICATE
            res.status(401).send({error});
        } else {
            // JWT is valid
            req.userId = decoded._id;
            next();
        }
    })
}



// Verify Refresh Token middleware (which will be verifying the session)
const verifySession = (req, res, next) => {
    // grab the refresh token from the request header
    const refreshToken = req.header('x-refresh-token');

    // grab the _id from the request header
    const _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            // user couldn't be found
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }

        // if the code reaches here - ther user was found
        // therefore the refresh token exists in the database
        // but we still have to check whether or not it has expired or not

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        })

        if (isSessionValid) {
            // the session is VALID

            // set properties on the request object
            req.userId = user._id;
            req.userObj = user;
            req.refreshToken = refreshToken;
            
            // call next() to continue processing this request
            next();
        } else {
            // the session is NOT valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }
    }).catch((e) => {
        res.status(401).send(e);
    })
}


/* ROUTE HANDLERS */

/* IMAGE ROUTES */

/**
 * GET /images
 * Purpose: Get all images
 */
app.get('/images', (req, res) =>{
    Image.find({}).then((images) =>{
        res.send(images);
    });
})

/**
 * POST /images
 * Purpose: Create an image
 */
app.post('/images', upload.none(),(req, res) =>{
    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;
    let userId = req.body.userId;
    let numberOfLikes = req.body.numberOfLikes;

    let newImage = new Image({
        title,
        description,
        url,
        userId,
        numberOfLikes
    });
    newImage.save().then((imageDoc) => {
        res.send(imageDoc);
    })
})
    


/**
 * PATCH /images/:id
 * Purpose: Update a specified image
 */
app.patch('/images/:id', (req, res) => {
    Image.findOneAndUpdate({ _id:req.params.id }, {
        numberOfLikes: req.body.numberOfLikes
    }).then(() => {
        res.sendStatus(200);
    });
})

/**
 * DELETE /images/:id
 * Purpose: Delete an existing image
 */
app.delete('/images/:id', (req, res) => {
    Image.findOneAndRemove({ 
        _id: req.params.id
    }).then((removeImageDoc) => {
        res.send(removeImageDoc);
    })
})

/**
 * GET /images/:imageId
 * Purpose: Get a specific Image
 */
app.get('/images/:imageId', (req, res) => {
    Image.find({
        _id: req.params.imageId
    }).then((image) => {
        res.send(image);
    })
});


/**
 * GET /images/favorites/:userId
 * Purpose: Get all images favorites of a User
 */

 app.get('/favorites/:userId/', (req, res) => {
    Favorite.find({
        _userId: req.params.userId,
    }).then((favorites) => {
        res.send(favorites);
    })
});


/**
 * GET /favorites/:userId/:imageId
 * Purpose: Check if a user favorite an image
 */
app.get('/favorites/:userId/:imageId', (req, res) => {
    Favorite.find({
        _userId: req.params.userId,
        _imageId: req.params.imageId
    }).then((favorites) => {
        res.send(favorites);
    })
});

/**
 * POST /favorites/:userId/:imageid
 */
app.post('/favorites/:userId/:imageId', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;

    let newFavorite = new Favorite({
        title: title,
        description: description,
        url: url,
        _userId: req.params.userId,
        _imageId: req.params.imageId
    });
    newFavorite.save().then(() => {
        res.send(newFavorite);
    })
})

/**
 * DELETE /favorites/:userId/:imageId
 */
 app.delete('/favorites/:userId/:imageId', (req, res) => {
    Favorite.findOneAndRemove({ 
        _userId: req.params.userId,
        _imageId: req.params.imageId
    }).then((removeFavoriteDoc) => {
        res.send(removeFavoriteDoc);
    })
})


/**
 * GET /likes/:userId/:imageId
 * Purpose: Get all likes of a User
 */
 app.get('/likes/:userId/:imageId', (req, res) => {
    Like.find({
        _userId: req.params.userId,
        _imageId: req.params.imageId
    }).then((likes) => {
        res.send(likes);
    })
});

/**
 * GET /likes/:imageId
 * Purpose: Get all likes of an image
 */
 app.get('/likes/:imageId', (req, res) => {
    Like.find({
        _imageId: req.params.imageId
    }).then((likes) => {
        res.send(likes);
    })
});


/**
 * POST /likes/:userId/:imageid
 */
app.post('/likes/:userId/:imageId', (req, res) => {
    let username = req.body.username;
    let newLike = new Like({
        username: username,
        _userId: req.params.userId,
        _imageId: req.params.imageId
    });
    newLike.save().then(() => {
        res.send(newLike);
    })
})

/**
 * DELETE /likes/:userId/:imageId
 */
 app.delete('/likes/:userId/:imageId', (req, res) => {
    Like.findOneAndRemove({ 
        _userId: req.params.userId,
        _imageId: req.params.imageId
    }).then((removeLikeDoc) => {
        res.send(removeLikeDoc);
    })
})





/**
 * DELETE /users/session
 * Purpose: Logout (Delete a session from the database)
 */
app.delete('/users/session', verifySession, (req, res) => {
    let userId = req.userId;
    let refreshToken = req.refreshToken; // this is the token we have to invalidate
    User.findOneAndUpdate({
        _id: userId
    }, {
        $pull: {
            sessions: {
                token: refreshToken
            }
        }
    }).then(() => {
        console.log("REMOVED SESSION");
        res.send();
    })
})


/* USER ROUTES */


/**
 * POST /users
 * Purpose: create a new user
 */
app.post('/users', (req, res) => {
    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session has been created successfully
        // and the refresh token has been returned

        // now we generate an access token for the user
        return newUser.generateAccessToken().then((accessToken) => {
            // access token generated successfully
            // now return an object that contains both auth tokens
            return { accessToken, refreshToken }
        })
    }).then((authTokens) => {
        // construct and send the response
        // with auth tokens in header, and user obj in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})




/**
 * POST /users/login
 * Purpose: Login a user
 */
app.post('/users/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findByCredentials(username, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session has been created successfully
            // and the Refresh Token has been returned (as a callback argument)

            return user.generateAccessToken().then((accessToken) => {
                // access token has been generated successfully
                // so now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            })
        }).then((authTokens) => {
            // now we construct and send the response to the user with their auth tokens
            // in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    })
})



/**
 * GET /users/me/access-token
 * Purpose: generate and return a fresh access token (JWT)
 */
app.get('/users/me/access-token', verifySession, (req, res) => {
    // we know that the user/caller is authenticated (because of the verifySession middleware)
    // and we have the userId and user object available to us
    req.userObj.generateAccessToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    })
})


/**
 * PATCH /users/:id
 * Purpose: update details of a user
 */
app.patch('/users/:id', authenticate, (req, res) => {
    let body = req.body;
    delete body.sessions;

    console.log(body);

    User.findOne({
        _id: req.userId
    }).then((userDoc) => {
        Object.assign(userDoc, body);
        userDoc.save().then(() => {
            res.status(200).send();
        })
    })
})






app.listen(3065, () => {
    console.log("Server is listening on port 3065");
})