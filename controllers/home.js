module.exports = {
    getIndex: (req, res) => {
        res.render('home.ejs')
    },
    getAbout: (req, res) => {
        res.render('about.ejs')
    },
    getFeatures: (req, res) => {
        res.render('features.ejs')
    },
    getFAQ: (req, res) => {
        res.render('faq.ejs')
    },
    getSupport: (req, res) => {
        res.render('support.ejs')
    },
    getBranding: (req, res) => {
        res.render('branding.ejs')
    },
    getDesign: (req, res) => {
        res.render('design.ejs')
    },
    getMarketing: (req, res) => {
        res.render('marketing.ejs')
    },
    getAdvertisement: (req, res) => {
        res.render('advertisement.ejs')
    },
    getContribute: (req, res) => {
        res.render('contribute.ejs')
    },
    getPress: (req, res) => {
        res.render('press.ejs')
    },
    getTerms: (req, res) => {
        res.render('terms.ejs')
    },
    getPrivacy: (req, res) => {
        res.render('privacy.ejs')
    },
    getCookies: (req, res) => {
        res.render('cookies.ejs')
    },
}