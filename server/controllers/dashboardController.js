exports.dashboard = async (req, res)=>{
    const locals = {
        pageTitle: "Dashboard",
        description: "Dashboard page"
    }

    res.render('dashboard/index', {
        locals, layout: 'layouts/dashboard'
    });
}