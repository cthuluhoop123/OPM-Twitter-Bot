const snoowrap = require('snoowrap')

const Twit = require('twit')

const colors = require('colors')

const translate = require('google-translate-api');

const T = new Twit({
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  '',
})

const r = new snoowrap({
  userAgent: '',
  clientId: '',
  clientSecret: '',
  username: 'kishichi',
  password: ''
});

var stream = T.stream('statuses/filter', { follow: '173049825' })
stream.on('tweet', function (tweet) {
  if(tweet.text.startsWith('RT')){
    return
  }else if(tweet.text.startsWith('@ONE_rakugaki')){
    return
  }else if(tweet.text.includes('@ONE_rakugaki')){
    return
  }else{
    translate(tweet.text, {to: 'en'}).then(res => {
      if(res.text.toUpperCase().includes("WANPANMAN" || "WANFANMAN")){
        r.getSubreddit('onepunchman').submitLink({
          title: "New post from One's twitter: " + '"' + tweet.text + '"' + ' | Loosely translated to: "' + res.text + '"',
            url: 'https://twitter.com/ONE_rakugaki/status/' + tweet.id_str
        })
      }
    }).catch(err => {
      console.error(err);
    })
  }

})
