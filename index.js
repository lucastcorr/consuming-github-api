const axios = require('axios')
const express = require('express')

const app = express()
app.use(express.json())

app.listen('3000')

app.route('/user').get( (req, res) =>  {
    axios.get("https://api.github.com/users/lucastcorr")
        .then(result => res.send(result.data))
        .catch(error => res.send(error))
})

app.route('/user/photo').get( (req, res) => {
    axios.get("https://api.github.com/users/lucastcorr")
        .then(result => res.send(`<img src="${result.data.avatar_url}"/>`))
        .catch((error) => res.send(error))
})

app.route('/user/repos').get( (req, res) => {
    (async function () {
        const user = await axios.get('https://api.github.com/users/lucastcorr');
        const userRepos = await axios.get(user.data.repos_url);

        res.send(userRepos.data)
    })();
})