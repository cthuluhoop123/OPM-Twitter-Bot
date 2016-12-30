const snoowrap = require('snoowrap')

const Twit = require('twit')

const colors = require('colors')

const translate = require('google-translate-api');

const T = new Twit({
  consumer_key:         'bjFtRdNc7wasg4CVMlLlfC26u',
  consumer_secret:      'WZSeUXthMEX8C5wxMsIapilfVXCAvo1IedkecxwzaSda8S9Mdw',
  access_token:         '812957194735915008-dYOtbwT7YBbSW35VuHlbPZTIDbB54S9',
  access_token_secret:  'Uk4Q7HAb5Wh17OOBg6Y89DZ7Lydq7plrCh6ig5qgh9eoB',
})

const r = new snoowrap({
  userAgent: 'KishichiScript',
  clientId: 'yztQBv5Pegt8DQ',
  clientSecret: 'MqL2xkBDAh74WCA2Plc8cFjI0rc',
  username: 'kishichi',
  password: 'smokeweed3'
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
