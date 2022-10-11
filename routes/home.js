const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex)
router.get('/about', homeController.getAbout)
router.get('/features', homeController.getFeatures)
router.get('/faq', homeController.getFAQ)
router.get('/support', homeController.getSupport)

router.get('/branding', homeController.getBranding)
router.get('/design', homeController.getDesign)
router.get('/marketing', homeController.getMarketing)
router.get('/advertisement', homeController.getAdvertisement)
router.get('/contribute', homeController.getContribute)
router.get('/press', homeController.getPress)
router.get('/terms', homeController.getTerms)
router.get('/privacy', homeController.getPrivacy)
router.get('/cookies', homeController.getCookies)

router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router