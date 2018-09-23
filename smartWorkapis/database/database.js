import * as requestmodel from './RequestSchema';
import * as userModel from './userSchema';
import { isArray } from 'util';

var mongoose = require('mongoose');

const UserList  = [{
    _id: new mongoose.Types.ObjectId(),
    UserName: 'Ashish',
    password: 'admin',
    admin: true,
    Empid: '654321',
    Email: 'ashish@gmail.com',
    MObile: '9876543219'

},
{
    _id: new mongoose.Types.ObjectId(),
    UserName: 'Yash',
    password: 'admin',
    admin: false,
    Empid: '65421',
    Email: 'yash@gmail.com',
    MObile: '9346543219'

},
{
    _id: new mongoose.Types.ObjectId(),
    UserName: 'admin',
    password: 'admin',
    admin: true,
    Empid: '564321',
    Email: 'ashish@gmail.com',
    MObile: '9876543219'

}]
const RequestList = [
    {
    UserName: 'Siddhant',
    ReqDate: Date.now(),
    WorkingDate: new Date(2018, 11, 24, 10, 33, 30, 0),
    ReqStatus: 'pending',
    trackingDetails: '',
    Email: 'sid@gmail.com',
    Manager: 'Monali',
    Mobile: '9312407659',
    EmpId: '234567',
    Desc: 'for fun',
    ApprovedBy: ''
    },
    {
    UserName: 'Yashwant',
    ReqDate: Date.now(),
    WorkingDate: new Date(2018, 11, 24, 10, 33, 30, 0),
    ReqStatus: 'pending',
    trackingDetails: '',
    Email: 'yash@gmail.com',
    Manager: 'Arvind',
    Mobile: '987666432',
    EmpId: '234567',
    Desc: 'Aivayi',
    ApprovedBy: ''
    },
    {
    UserName: 'Ashish',
    ReqDate: Date.now(),
    WorkingDate: new Date(2018, 11, 24, 10, 33, 30, 0),
    ReqStatus: 'pending',
    trackingDetails: '',
    Email: 'ashish@gmail.com',
    Manager: 'Monali',
    Mobile: '9807889087',
    EmpId: '234567',
    Desc: 'For fun',
    ApprovedBy: ''
    }
    
];

function connect() {
    return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://127.0.0.1:27017/test', function(err){
    if(err) {
        reject(err);
    } else {
    console.log('Database successfully connected');
     resolve()
    }
    });
});
}

export function db() {
    // mongoose.connect('mongodb://127.0.0.1:27017/test', function(err){
    // if(err) throw err;
    // console.log('Database successfully connected');
//     var userSchema = mongoose.Schema({
//         _id: mongoose.Schema.Types.ObjectId,
//         name: String,
//         pasword: String,
//         admin: Boolean
//     },
// {
//     versionKey: false
// });
    // var User = mongoose.model('User', userSchema);
    connect().then(() => {
    UserList.map((user) => {
    var user1 = new userModel.userModel(user);
    user1.save((err) => {
        if(err) throw err;
        console.log('User created successfully');
    })})
    RequestList.map((req) => {var Request = new requestmodel.requestModel(req);
        Request.save((err) => {
            if(err) throw err;
            console.log('Request created successfully');
        })
    });
}).catch((err) => {
    console.log('db connection err', err);
});
}

export function loginCheck(req) {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        connect().then(() => {
        var user = userModel.userModel;
        user.find({UserName: req.body.username, password: req.body.password}, (err, users) => {
            if(users && users[0]) {
                const userDetails = users[0]._doc ? users[0]._doc : {}
                resolve(userDetails);
            } else {
                reject('invalid user');
            }
        })
    }).catch((err) => {
        console.log('db connection err', err)
        reject(err)
    })
}); 
}

export function submitRequest(req) {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        connect().then(() => {
        const stayRequest = {
            UserName: req.body.username,
            ReqDate: Date.now(),
            WorkingDate: req.body.workingDate || Date.now(),
            ReqStatus: req.body.status || 'pending',
            trackingDetails: '',
            Email: req.body.email,
            Manager: req.body.manager,
            Mobile: req.body.mobile,
            EmpId: req.body.EmpId,
            Desc: req.body.desc,
            ApprovedBy: req.body.ApprovedBy || ''
            }
        var request = requestmodel.requestModel(stayRequest);
        request.save((err, dbresponse) => {
            if(err) {
                console.log('Request failed to save')
                rejct({
                    error: err,
                    message: 'Request failed to register'
                });
            } else {
                console.log(dbresponse);
                resolve({ success: true });
            }
        })
    }).catch((err) => {
        console.log('db connection err', err)
        reject(err)
    })
}); 
}

export function RegisterUser(req) {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        connect().then(() => {
        const user = {
                _id: new mongoose.Types.ObjectId(),
                UserName: req.body.userName,
                password: req.body.password,
                admin: false,
                Empid: req.body.Empid,
                Email: req.body.email,
                MObile: req.body.mobile
            
            }
        var RegisterUser = userModel.userModel(user);
        RegisterUser.save((err, dbresponse) => {
            if(err) {
                console.log('User failed to register')
                rejct({
                    error: err,
                    message: 'User failed to register'
                });
            } else {
                console.log(dbresponse);
                resolve({ success: true });
            }
        })
    }).catch((err) => {
        console.log('db connection err', err)
        reject(err)
    })
}); 
}

export function getRequests() {
    return new Promise((resolve, reject) => {
        connect().then(() => {
            var request = requestmodel.requestModel;
            request.find({},(err, res) => {
                if(err) {
                    console.log('Error fetching requests from db');
                    reject({
                        'Message': 'Error Fetching Data from Db',
                        'Error': err
                    }) 
                } else {
                    const requestlist = [];
                    if(res && isArray(res) && res.length > 0) {
                        res.forEach((model) => {
                            requestlist.push(model._doc)
                        });
                        resolve({'data': requestlist})
                    } else {
                    resolve({'data': []});
                }}
        }).catch((err) => {
            console.log('db connection err', err)
            reject(err)
        })
    });
});
}

export function getRequestsforUser(req) {
    return new Promise((resolve, reject) => {
        connect().then(() => {
            let user = "";
            if(req && req.body && req.body.userName) {
                user = req.body.userName
            } else {
                reject({
                    'Message': 'Invalid Request',
                })
            }
            var request = requestmodel.requestModel;
            request.find({UserName: user},(err, res) => {
                if(err) {
                    console.log('Error fetching requests from db');
                    reject({
                        'Message': 'Error Fetching Data from Db',
                        'Error': err
                    }) 
                } else {
                    const requestlist = [];
                    if(res && isArray(res) && res.length > 0) {
                        res.forEach((model) => {
                            requestlist.push(model._doc)
                        });
                        resolve({'data': requestlist})
                    } else {
                    resolve({'data': []});
                }}
        }).catch((err) => {
            console.log('db connection err', err)
            reject(err)
        })
    });
});
}

export function updateReq(req) {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        connect().then(() => {
        var request = requestmodel.requestModel;
        request.findOneAndUpdate({_id: req.body.id }, { $set: { ReqStatus: req.body.status, ApprovedBy: req.body.userName  }},{}, (err,response) => {
            if(err) {
                console.log('Error updating request',err)
                reject({
                    'error': err,
                    'message': 'Invalid request Id'
                })
            } else {
                
                resolve({ success: true})
            }
        })
        // user.find({_id: req.body.id }, (err, users) => {
        //     if(users && users[0]) {
        //         const userDetails = users[0]._doc ? users[0]._doc : {}
        //         resolve(userDetails);
        //     } else {
        //         reject('invalid user');
        //     }
        // })
    .catch((err) => {
        console.log('db connection err', err)
        reject(err)
    })
}); 
});
}
