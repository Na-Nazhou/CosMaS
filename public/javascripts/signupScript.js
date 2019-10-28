function check(event) {
	// Get Values
	var id  = document.getElementById('id' ).value;
	var name    = document.getElementById('name'   ).value;
	var password = document.getElementById('password').value;
	
	// Simple Check
	if(id.length != 9) {
		alert("Invalid user ID");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	if(name.length == 0) {
		alert("Invalid name");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	if(password.length < 8) {
		alert("Password too short, must be at least 8 characters");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
}