module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.isLoggedIn){
        req.session.returnTo = req.originalUrl;
        // req.flash('error', 'You must be signed in first!');
        return res.redirect('/velvethomes/login');
    }
    next();
}
module.exports.isLoggedInCompany = (req, res, next) => {
    if (!req.session.isLoggedInCompany) {
        req.session.returnTo = req.originalUrl;
        return res.redirect('/seller/login');
    }
    next();
}
module.exports.isLoggedInAdmin = (req, res, next) => {
    if (!req.session.isLoggedInAdmin) {
        req.session.returnTo = req.originalUrl;
        return res.redirect('/admin/login');
    }
    next();
}