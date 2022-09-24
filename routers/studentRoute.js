const express = require('express');
const path = require('path');
const {
	showAllstudent,
	showCreatestudent,
	showEditstudent,
	showSinglestudent,
	showAddstudent,
	Deletestudent,
	updateStudent,
	showUnverifyedstudent,
	verifyAccount,
} = require('../Controllers/studentController');
const multer = require('multer');
const route = express.Router();
// multer input
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../public/image/student/'));
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const sudentImgmulter = multer({
	storage: storage,
}).single('student-photo');
// create route
route.get('/', showAllstudent);
route.get('/unverifyed', showUnverifyedstudent);
route.get('/create', showCreatestudent);
route.post('/create', sudentImgmulter, showAddstudent);
route.get('/edit/:id', showEditstudent);
route.get('/verify/:token', verifyAccount);
route.post('/update/:id', sudentImgmulter, updateStudent);
route.get('/delete/:id', Deletestudent);
route.get('/:id', showSinglestudent);

module.exports = route;
