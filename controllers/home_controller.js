// Controller function for rendering the "Home" page
module.exports.home = function(req, res) {
    if (req.isAuthenticated()) {
        return res.render('home', {
            title: 'Home'
        });
    } else {
        return res.redirect('/users/sign-in');
    }
};
