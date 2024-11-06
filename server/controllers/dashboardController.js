exports.dashboard = async (req, res)=>{
    if (!req.isAuthenticated()) {
        return res.redirect('/')
    }
    const locals = {
        pageTitle: "Dashboard",
        description: "Dashboard page"
    }
    const user = req.user;

    res.render('dashboard/index', {
        locals, layout: 'layouts/dashboard', user
    });
}