users = [];
async function insert(user){
    // make a mongo db call to save user in db
    console.log("saving user to db",user);
     users.push(user);
     return user;
}

module.exports = 
{
    insert 
};