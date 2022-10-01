exports.logins = (req, res) => {
    res.render('login', {
        title : 'loginpage'
    });
}

exports.regs = (req, res) => {
    res.render('reg', {
        title : 'regpage'
    });
}