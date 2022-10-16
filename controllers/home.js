module.exports = {
    getIndex: (req, res) => {
        res.render('home.ejs', { user: req.user })
    },
    getSupport: (req, res) => {
        res.render('support.ejs', { user: req.user })
    },
    getBranding: (req, res) => {
        res.render('branding.ejs', { user: req.user })
    },
    getDesign: (req, res) => {
        res.render('design.ejs', { user: req.user })
    },
    getMarketing: (req, res) => {
        res.render('marketing.ejs', { user: req.user })
    },
    getAdvertisement: (req, res) => {
        res.render('advertisement.ejs', { user: req.user })
    },
    getContribute: (req, res) => {
        res.render('contribute.ejs', { user: req.user })
    },
    getPress: (req, res) => {
        res.render('press.ejs', { user: req.user })
    },
    getTerms: (req, res) => {
        res.render('terms.ejs', { user: req.user })
    },
    getPrivacy: (req, res) => {
        res.render('privacy.ejs', { user: req.user })
    },
    getCookies: (req, res) => {
        res.render('cookies.ejs', { user: req.user })
    },
}