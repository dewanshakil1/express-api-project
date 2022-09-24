const path = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { verifyedAccountMail } = require('../utility/sendMail');

const showAllstudent = (req, res) => {
	const allstudent = JSON.parse(
		readFileSync(path.join(__dirname, '../db/student.json'))
	);
	const verifyed = allstudent.filter((data) => data.isverifyed == true);
	res.render('student/index', {
		allstudent: verifyed,
	});
};
const showUnverifyedstudent = (req, res) => {
	const allstudent = JSON.parse(
		readFileSync(path.join(__dirname, '../db/student.json'))
	);
	const unverifyed = allstudent.filter((data) => data.isverifyed == false);
	res.render('student/unverifyed', {
		allstudent: unverifyed,
	});
};
const showCreatestudent = (req, res) => {
	const allstudent = JSON.parse(
		readFileSync(path.join(__dirname, '../db/student.json'))
	);
	res.render('student/create');
};
const showAddstudent = async (req, res) => {
	const allstudent = JSON.parse(
		readFileSync(path.join(__dirname, '../db/student.json'))
	);
	const { name, email, cell, location } = req.body;
	let lastId = 1;
	if (allstudent.length > 0) {
		lastId = allstudent[allstudent.length - 1].id + 1;
	}
	// create token
	const token = Date.now() + '_' + Math.floor(Math.random() * 10000000);

	// send mail
	await verifyedAccountMail(email, 'verifyed', {
		name,
		email,
		token,
		cell,
	});

	allstudent.push({
		id: lastId,
		name: name,
		email: email,
		cell: cell,
		location: location,
		photo: req.file ? req.file.filename : 'abata.png',
		isverifyed: false,
		token: token,
	});
	// now write data in bd
	writeFileSync(
		path.join(__dirname, '../db/student.json'),
		JSON.stringify(allstudent)
	);
	// redirect
	res.redirect('/student');
};
const showEditstudent = (req, res) => {
	// student data
	const allstudent = JSON.parse(
		readFileSync(path.join(__dirname, '../db/student.json'))
	);
	// edit data
	const { id } = req.params;
	const editdata = allstudent.find((data) => data.id == id);

	res.render('student/edit', {
		editdata,
	});
};
// update student data
const updateStudent = (req, res) => {
	const allstudent = JSON.parse(
		readFileSync(path.join(__dirname, '../db/student.json'))
	);
	const { id } = req.params;
	allstudent[allstudent.findIndex((data) => data.id == id)] = {
		...allstudent[allstudent.findIndex((data) => data.id == id)],
		name: req.body.name,
		email: req.body.email,
		cell: req.body.cell,
		location: req.body.location,
	};
	// now write data json db
	writeFileSync(
		path.join(__dirname, '../db/student.json'),
		JSON.stringify(allstudent)
	);

	res.redirect('/student');
};
const showSinglestudent = (req, res) => {
	const allstudent = JSON.parse(
		readFileSync(path.join(__dirname, '../db/student.json'))
	);
	const { id } = req.params;
	const student = allstudent.find((data) => data.id == id);

	res.render('student/show', {
		student,
	});
};
const Deletestudent = (req, res) => {
	const allstudent = JSON.parse(
		readFileSync(path.join(__dirname, '../db/student.json'))
	);
	const { id } = req.params;
	const updatestudent = allstudent.filter((data) => data.id != id);

	writeFileSync(
		path.join(__dirname, '../db/student.json'),
		JSON.stringify(updatestudent)
	);

	res.redirect('/student');
};
// verify account
const verifyAccount = (req, res) => {
	// all student
	const allstudent = JSON.parse(
		readFileSync(path.join(__dirname, '../db/student.json'))
	);
	// take token
	const token = req.params.token;

	allstudent[allstudent.findIndex((data) => data.token == token)] = {
		...allstudent[allstudent.findIndex((data) => data.token == token)],
		isverifyed: true,
		token: '',
	};
	writeFileSync(
		path.join(__dirname, '../db/student.json'),
		JSON.stringify(allstudent)
	);

	res.redirect(/student/);
};
module.exports = {
	showAllstudent,
	showCreatestudent,
	showEditstudent,
	showSinglestudent,
	showAddstudent,
	Deletestudent,
	updateStudent,
	showUnverifyedstudent,
	verifyAccount,
};
