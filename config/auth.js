module.exports={
    ensureAuthenticated: function (req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }       
        req.flash('error_msg', 'Please Loggin to view this content..!');
        res.redirect('/users/login'); 
    }

}