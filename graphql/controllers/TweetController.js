const BaseController = require( './BaseController' );
const Tweet = require( '../models/Tweet_Model' );
const Replies = require( '../models/Replies_Model' );
const Validator = require( 'validatorjs' );

class TweetController extends BaseController {

    async getAll() {
        let tweets = await Tweet.find().populate('authorId')
        let res = this.respond( 'get all of them', tweets );
        return res;
    }

    async getTweet(TweetID) {
        let tweet = await Tweet.findById(TweetID).populate('authorId');
        console.log(tweet, 'eeeeeeeeeeeeeee')
        let res = this.respond( 'Your tweet is here', [ tweet ] );
        // console.log(res);
        return res
    }
    
    async addTweet( args ){
        console.log('55555555555555555')
        let rules= {
            body: 'required|string',
        }

        let validator = new Validator( args, rules );

        if(validator.fails()) {
            return this.respondWithErrors( validator.errors.all() );
        }

        let tweet = new Tweet ({
            body: args.body,
            authorId: args.authorId
        });

        const savedTweet = await tweet.save();
        return this.respond( 'tweet is saved',  [ savedTweet ]  )
        
    }

    async DeleteTweet( args ) {
        try{
            let tweet = await Tweet.findOneAndRemove( { _id: args.TweetID } )
            return this.respond( 'Tweet has removed',  [ tweet ] );
        }catch(e){
            console.log(e);
        }
    }
      

    async ReplyTweet( args ) {
        let replyTweet = await Tweet.findById( args.TweetID )
        if (!replyTweet) {
            throw Error('This tweet is not found')
        }
        const reply = await new Replies({
            body: args.body,
            authorId: args.authorId,
            TweetID: args.TweetID
        }).save()
        let newPopulation = await Tweet.populate(reply, 'authorId')
        let res = this.respond( ' reply the tweet ', [newPopulation] )
        return res;
    }

    async searchTweet(args){
        let tweet = await Tweet.find({
            $text: {
                $search: args.body
            }
        });
        console.log(tweet);
        let res = this.respond( 'search', tweet );
        return res;
    }
}

module.exports = new TweetController();