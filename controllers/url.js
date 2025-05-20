const shortid = require("shortid");
const URL = require("../models/url");


async function handleGenrateShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "Url is reqired"});
    const shortUrl = shortid();
    await URL.create({
        shortedUrl: shortUrl,
        requiredUrl:body.url,
        visitedUrl:[],
        createdBy: req.user._id,
    });
    return res.render("index",{
        id:shortUrl,
    })
    return res.json({id:shortUrl})
}

async function handleGetAnalytics(req,res){
    const shortedUrl = req.params.shortedUrl;
    const result =await URL.findOne({shortedUrl})
    return res.json({
        Clicks: result.visitedHistory.length,
        Analytics: result.visitedHistory,
    })
}

module.exports = {
    handleGenrateShortUrl,handleGetAnalytics
}