const PORT = process.env.PORT || 8222
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const cors = require('cors') // headers
app.use(cors())
// var MongoClient = require('mongodb').MongoClient;




async function leet(link) {
    var results = []
    graphqlEndpoint = "https://leetcode.com/graphql/"
    let titleSlug = link.split('https://leetcode.com/problems/')[1].split('/')[0] || link.split('https://leetcode.com/explore/')[1] 
    const query = [`
    query questionTitle($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            title
            titleSlug
            difficulty
            categoryTitle
        }
    }
    `,`query questionContent($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            content
        }
    }`,`query singleQuestionTopicTags($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            topicTags {
                name
            }
        }
    }`];

    const variables = {
        titleSlug: titleSlug
    };


    // wanted to make array 
    const operationName = ['questionTitle', 'questionContent', 'singleQuestionTopicTags'];

    let headers = {
        "Host": "leetcode.com",
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
    }

    for (let i = 0; i < operationName.length; i++) {
        const response = await axios.post(graphqlEndpoint, {
            query: query[i],
            variables: variables,
            operationName: operationName[i]
        }, { headers }).then(response => {
            const data = response.data.data.question;
            console.log(data)
            return data
        }).catch(err => console.log(err))
        results.push(response)
    }

     
    // const resp = await axios.get(link, { headers })
    //     .then(response => {
    //         const html = response.data
    //         const $ = cheerio.load(html)
    //         let site = "leetcode"
    //         let titles = []
    //         let difficulty = []
    //         let hrefs = []
    //         let descriptions = []
    //         console.log("here")
    //         $('.text-title-large', html).each(function () {
    //             console.log( "TExtg ==>", $this.text())
    //             titles.push($(this).text())
    //             hrefs.push($(this).attr('href'))
    //             descriptions.push($(this).next().text())
    //         })
    //         console.log(titles)
    //         return titles 
    //     }).catch(err => console.log(err))
    return results;
}


async function cforce(link){
    let headers = {
        "Host": "codeforces.com",
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
    }
    const resp = await axios.get(link, { headers })
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            let site = "codeforces"
            let titles = []
            let difficulty = []
            let tags = []
            let descriptions = []
            console.log("here")
            $('.header > div:nth-child(1)', html).each(function () {
                titles.push($(this).text())
            })

            $('.tag-box', html).each(function () {
                tags.push($(this).text().replace(/\s+/g, ' ').trim())
            })

            // $('.header > div:nth-child(1)', html).each(function () {
            //     titles.push($(this).text())
            // })

            console.log(titles)
            return [titles, tags]
        }).catch(err => console.log(err))
    return resp;
}


async function hackerrank(link){
    var results = []
    let headers = {
        "Host": "hackerrank.com",
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
    }
    const resp = await axios.get(link, { headers })
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            let site = "hackerrank"
            let title = ""

            let difficulty = []
            let tags = []
            let descriptions = ""
            console.log("here")
            $('.page-label', html).each(function () {
                title = $(this).text()
            })

            $('.pull-right', html).each(function () {
                difficulty.push($(this).text())
            })

            $('.challenge_problem_statement_body > div:nth-child(1) > p:nth-child(3)', html).each(function () {
                descriptions = $(this).text().replace(/\s+/g, ' ').trim()
            })

            let difficult = difficulty[1]

            results.push({site, title, difficult, descriptions})

            console.log(title)
            return results
        }).catch(err => console.log(err))
    return resp;


}




app.get('/', function (req, res) {
	res.json('hello, it works')
})

app.get('/hackerrank', async function(req, res){
    const link = req.query.link
    const titles = await hackerrank(link)
    res.json(titles)
})


app.get('/cforce', async function(req, res){
    const link = req.query.link
    const titles = await cforce(link)
    res.json(titles)
})


app.get('/leet', function (req, res) {
    const link = req.query.link
    const titles = leet(link)
    res.json(titles)
})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

