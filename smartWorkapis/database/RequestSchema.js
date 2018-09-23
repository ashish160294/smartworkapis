import mongoose from 'mongoose';


const RequestSchema = new mongoose.Schema({
    UserName: String,
    ReqDate: Date,
    WorkingDate: Date,
    ReqStatus: String,
    trackingDetails: String,
    Email: String,
    Manager: String,
    Mobile: String,
    EmpId: String,
    Desc: String,
    ApprovedBy: String
},
{
    versionKey: false
});
var requestModel = mongoose.model('Request', RequestSchema );
export {
    requestModel
};