exports.homepage = async (req, res)=>{
    const locals = {
        pageTitle: "Versed",
        description: "Drop your verse we'll catch it"
    }

    res.render('index', {
        locals, layout: 'layouts/front-page'
    });
}

exports.about = async (req, res)=>{
    const locals = {
        pageTitle: "About",
        description: "All about Versed"
    }

    res.render('about', {
        locals, layout: 'layouts/about-page'
    });
}

