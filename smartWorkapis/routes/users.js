var express = require('express');
var router = express.Router();
import * as db from '../database/database'
import * as email from '../email/email';

const validStatuses = ['pending', 'approved', 'rejected'];
/* GET users listing. */
router.get('/initialize', function(req, res) {
  db.db();
  res.json({status: 'ok'})
});
router.post('/login', (req, res) => {
  db.loginCheck(req).then((response) => {
      res.send(response);
        }).catch((err) => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

router.post('/request', (req, res) => {
  db.submitRequest(req).then((response) => {
    res.status(200).json({'success': true});
  }).catch()
})

router.post('/register', (req, res) => {
  db.RegisterUser(req).then((response) => {
    res.status(200).json({'success': true});
  }).catch()
})

router.get('/requests', (req, res) => {
  db.getRequests(req).then((response) => {
    res.status(200).json(response);
  }).catch((err) => {
    console.log('err:',err);
    res.status(500).json({
      'error': err
    })
  }); 
})

router.post('/userequests', (req, res) => {
  db.getRequestsforUser(req).then((response) => {
    res.status(200).json(response);
  }).catch((err) => {
    console.log('err:',err);
    res.status(500).json({
      'error': err
    })
  }); 
})
router.post('/updateReqStatus', (req, res) => {
  if(validStatuses.find((status) => {
    return status === req.body.status.toLowerCase()})) {
  db.updateReq(req).then((response) => {

    res.status(200).json({'success': true});
  }).catch((err) => {
    res.status(500).json({
      'err': err,
      'message': 'request cannot be updated'
    })
  });
} else {
  res.status(500).json({
    'message': 'status supplied is invalid'
  })
}
})
router.post('/sos', (req,res) => {
  email.mailReceipient().then(() => {
    res.status(200).json({
      'message': 'Email Sent'
    })
  }).catch((err) => {
    res.status(500).json({
      'err': err,
      'message': 'Error sending Email'
    })
  })
})

router.post('/location', (req,res) => {
  res.status(200)
})

  
module.exports = router;
