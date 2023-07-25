// Middleware to set flash messages in res.locals for easy access in views
module.exports.setFlash = function(req, res, next) {
    // Extract flash messages from req.flash and store them in res.locals.flash
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    };

    // Call the next middleware in the chain
    next();
};
