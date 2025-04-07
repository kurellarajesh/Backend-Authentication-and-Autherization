const adminMiddleware = (req, res, next) => {
    const adminAccess = req.userInfo.role;
    if(adminAccess != 'admin'){
        return res.json({
            success : false,
            message : 'Not accessed to the page, Admin rights required'
        });
    }
    next();
}

module.exports = adminMiddleware;