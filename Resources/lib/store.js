var TweetDB = function() {
    this.dbName = 'tweetdb'; //(1)
    
    this.open = function () { //(2)
        this.db = Titanium.Database.open(this.dbName);
    };

    this.close = function () { //(3)
        this.db.close();
    };

    this.addTweets = function (tweets) { //(4)
        this.open();
        for (var i=0;i<tweets.length;i++) {
            var tweet = tweets[i];
            var rows = this.db.execute( //(5)
                'SELECT * FROM tweets WHERE status_id = ?',
                tweet.id_str
            );
            Ti.API.debug('Found: ' + rows.getRowCount() );
            if ( rows.getRowCount() > 0 ) continue;

            var res = this.db.execute(
                'INSERT INTO tweets (screen_name, profile_image_url, tweet_text, status_id, created_at) VALUES(?,?,?,?,?)',
                tweet.user.screen_name,
                tweet.user.profile_image_url,
                tweet.text,
                tweet.id_str,
                tweet.created_at
            );
            Ti.API.debug('Add to DB');
        }
        this.close();
        return true;
    };


    this.open();
    this.db.execute('CREATE TABLE IF NOT EXISTS tweets (screen_name TEXT, profile_image_url TEXT, tweet_text TEXT, status_id TEXT, created_at TEXT)');
    this.close();
};