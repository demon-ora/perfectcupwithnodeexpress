exports.homes = (req, res) => {
    res.render('index', {
        title : 'homepage'
    });
}

exports.abouts = (req, res) => {
    res.render('about', {
        title : 'aboutpage'
    });
}


exports.contacts = (req, res) => {
    res.render('contact', {
        title : 'contactpage'
    });
}