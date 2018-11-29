const BaseController = require( './BaseController' );
const User = require( '../models/User_Model' );
const Tweet = require( '../models/Tweet_Model' );
const Validator = require( 'validatorjs' );
const Formatter = require( '../helpers/Formatter' );
const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' );

class UserController extends BaseController {
    async getAll() {
        let users = await User.find().populate( 'followers following' );
        let res = this.respond( 'Get them all' , users )
        return res;
    }

    async getUser(UserID) {
        let user = await User.findOne({_id: UserID})
        .populate('tweets')
        let res = this.respond( 'User is here',  [user]  );
        // console.log(res)
        return res;
    }

    async signUp(args) {
        let rules = {
            name : 'required|string',
            email : 'required|string',
            password : 'required'
        }

        let validator = new Validator( args , rules );

        try{

            if(validator.fails()) {
                let errors = Formatter.formatValidationErrors( validator.errors.all() );
                return this.respondWithErrors( errors );
            }
            
            let validEmail = await User.findOne( { email: args.email } );
        
            if(validEmail){ 
                return this.respondWithErrors( { email: 'This is email is not valid' } );
            }

            let encryptedPassword = await bcrypt.hash( args.password, 10 );

            let user = new User({
                name: args.name,
                email: args.email,
                password: encryptedPassword,
            })
            const addUser = await user.save();

            let payload = {
                email: addUser.email,
                UserID: addUser._id
            }
            
            let token = await jwt.sign( payload, 'rrrr' )
            addUser.token = token;
            return this.respond ( 'User is added' , [addUser] )

        } catch(e) {
            console.log(e);
        }
    }

    async login( args ) {
        let rules= {
            email: 'required|string',
            password: 'required|string'
        }

        let validator = new Validator( args, rules );

        if( validator.fails() ){
            return this.respondWithErrors( validator.errors.all() );
        }
        let validEmail = await User.findOne( { email: args.email } );
        
        if(!validEmail){ 
            return this.respondWithErrors( { email: 'This is email is not valid' } );
        }
        let validPassword = await bcrypt.compare( args.password, validEmail.password );

        if(!validPassword) {
            return this.respondWithErrors( { password: 'Password is not correct' } );
        }

        let payload = {
            email: validEmail.email,
            id: validEmail._id
        }

        let token =jwt.sign( payload, 'rrrr' )
        validEmail.token = token;

        return this.respond( 'sucessfully loggeed in ', [ validEmail ] );
        
    }

    async updateUser(args) {
        let update = await User.findOneAndUpdate( { _id: args.UserID }, {
            name: args.name,
            email: args.email,
        }, { new: true } )

        return this.respond( 'User is updated', [ update ] );
    }

    async changePassword( args ) {
        let encryptedPassword = await bcrypt.hash( args.password, 10 )
        let changePassword = await User.findOneAndUpdate( { _id: args.UserID } , {
            password: encryptedPassword
        } , { new: true });
        return this.respond( 'Password Changed', [ changePassword ] )
    }

    async FollowUser( args ) {
        let followed = await User.findById(args.followed).populate('followers');
        followed.followers.push(args.follower);
        let follower = await User.findById(args.follower).populate('following');
        follower.following.push(args.followed);
        follower.save();
        followed.save();
        return this.respond( 'Followed', [ followed, follower ] )
    }

    async unFollowUser( args ) {
        try{
            let unFollowed = await User.findById(args.followed).populate('following')
            unFollowed.followers.pull(args.follower);
            let followed = await User.findById(args.follower).populate('followers')
            followed.following.pull(args.followed);
            unFollowed.save();
            followed.save();
            return this.respond( 'unFollowed',  [ unFollowed, followed ] );
        } catch(err){
            console.log(err)
        }
    }

    async FavoriteTweet( args ) {
        let FavoriteTweet = await Tweet.findById( args.TweetID );
        FavoriteTweet.users.push( args.UserID );
        FavoriteTweet.save();
        let user = await User.findById( args.UserID );
        user.favorites.push( args.TweetID );
        user.save();
        let res = this.respond( 'Favorited', [ FavoriteTweet ] );
        return res;
    }

    async unFavoritedTweet( args ) {
        let unFavorited = await Tweet.findById ( args.TweetID );
        unFavorited.users.pull( args.UserID );
        unFavorited.save();
        let userUnFavorited = await User.findById( args.UserID )
        userUnFavorited.favorites.pull( args.TweetID )
        userUnFavorited.save();
        return this.respond( 'unfavorited', [ unFavorited ] );
    }

    async homePage( args ) {
        let user = await User.findById(args.id).populate('followers'
        );
        // user.followers.push( args.UserID );
        // user.save();
        console.log(user.following, user.following.length)
        return this.respond('lllll', [user]);

    }
}

module.exports = new UserController();