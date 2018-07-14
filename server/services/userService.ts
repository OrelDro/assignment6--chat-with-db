import User from '../models/User';
import Group from '../models/Group';

export function getUsersList() {
    return new Promise( (resolve,reject) => {
        User.find(null,{password:0,__v:0}).then( (usersList) => {
            resolve (usersList);
        }).catch( (e) => {
            reject(e);
        })
    })
}

export function addUser(newUser) {
    return new Promise( (resolve, reject) => {
        const user = new User(newUser);
        user.save().then((returnUser) => {
            resolve(returnUser);
        }).catch( (e) => {
            reject(e);
        })
    })
}

export function deleteUser(id: string) {
    return new Promise((resolve, reject) => {
        User.findOneAndDelete({_id:id},{projection:{password:0,__v:0}}).then((deletedUser) => {
            Group.update({items:deletedUser._id},{$pullAll:{items:[deletedUser._id]}}).then((res) => {
                if(res) {
                    resolve(deletedUser);
                }
            })
        }).catch( (e) => {
            reject(e);
        })
    })
}

export function updateUser(user) {
    return new Promise( (resolve, reject) => {
        User.findOneAndUpdate({_id:user._id},
            {username:user.username,password:user.password,age:user.age,type:"User"},
            {new:true,projection:{password:0,__v:0}}).then( (userUpdated) => {
                resolve(userUpdated);
        }).catch( (e) => {reject(e)});
    })
}

export function Login(username:string, password: string) {
    return new Promise( (resolve, reject) => {
        User.find({username:username,password:password},{password:0,__v:0}).then((userFind) => {
            if(userFind.length > 0) {
                resolve(userFind);
            }
            else {
                resolve({status:"username or password are wrong"});
            }
        }).catch((e) => {
            reject(e);
        })
    })
}


