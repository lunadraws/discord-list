const mongoose = require('mongoose');
const { Schema } = mongoose;
const {fetch} = require("rovel.js");
const Bots = new Schema({
 _id: {
    default: () => new Date(),
    type: Date
  }, //added at
 id: {
  type: String , 
  unique: true,
  required: true
  }, //botId
  card: {
   img: String,
   title: String,
   msg: String
  },
  username: {type: String, unique: true, required: true},
  avatar: {type: String, unique: true, required: true},
  discriminator: {type: String, required: true},
  status: String,
 owners: [{type: String}], //owners
 lib: {type: String},
 short: String, //short desc
 desc: String, //description
 prefix: String, //bot prefix
 verified: { type: Boolean, default: false }, //verified bot or not
 added: {type: Boolean, default: false},
 webhook: String,
 support: String, //support server id
 bg: String, // background image link
 github: String, //github link
 website: String, //website link
 donate: String, //donate account link
 invite: String, // invite link
 servers: { type: Number, default: 1 },
 promoted: { type: Boolean, default: false },
 votes: { type: Number, default: 0 },
 badges: [{ type: String }],
},{ versionKey: false, toJSON: { virtuals: true }, toObject: { virtuals: true }});

Bots.virtual('avatarURL').get(function(){
  if((this.avatar=="1")||(this.avatar=="2")||(this.avatar=="3")||(this.avatar=="4")) return `https://cdn.discordapp.com/embed/avatars/${this.avatar}.png`;
 var ani=false;
 if(this.avatar.startsWith("a_")) ani=true;
 const aniurl=`https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.gif`;
 const nonurl=`https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png`;
 const url = (ani)?aniurl:nonurl;
 return url;
});

Bots.virtual('tag').get(function(){
 return `${this.username}#${this.discriminator}`;
});
Bots.virtual('timestamp').get(function(){
 return `${~~(this._id / 1000)}`
})
Bots.index({'$**': 'text'});
var bots;
try{
console.log("[DB] Compiling Schema into Model - Bots");
bots = mongoose.model('Bots', Bots);
}
catch(e){
 bots = mongoose.model('Bots');
}
module.exports = bots;