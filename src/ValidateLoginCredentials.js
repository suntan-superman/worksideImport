/* eslint-disable */

import React from "react";

const ValidateLoginCredentials = (userName, password) => {
	console.log('Validating login credentials...');
	if (userName === '' || password === '') {
		alert('Please enter your username and password.');
		return false;
	}
	return true;
}

export default ValidateLoginCredentials;
