const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')

const router = express.Router()

const Url = require('../model/urlModel.js')

const baseUrl = 'http:localhost:5000'

router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({
            urlCode: req.params.code
        })
        if (url) {
            return res.redirect(url.longUrl)
        } else {
            return res.status(404).json('No URL Found')
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})

router.post('/shorten', async (req, res) => {
    const {
        longUrl
    } = req.body 

    if (!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base URL')
    }

    const urlCode = shortid.generate()

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({
                longUrl
            })

            if (url) {
                res.json(url)
            } else {
                const shortUrl = baseUrl + '/api/' + urlCode
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
})

module.exports = router