function allowRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: `Access forbidden: Required role [${allowedRoles.join(', ')}], current role is '${req.user.role}'` 
            });
        }

        next();
    };
}

module.exports = {
    allowRoles
};
