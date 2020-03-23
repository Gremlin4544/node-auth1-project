module.exports = (req, res, next) => {

    //check that we remember the client, that the client already logged in - in that case, you're going to call next
    // console.log('session', req.session);

    if(req.session && req.sessin.user) {
        next();
    } else {
        res.status(401).json({ you: '"shall not pass!' });
    }
   
}