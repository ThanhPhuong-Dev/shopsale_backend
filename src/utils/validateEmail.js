function ValidateEmail(email) {
  email.toLowerCase();
  const ref =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  // const ref = /^[^\s@]+@gmail\.com$/;
  return ref.test(email);
}

module.exports = ValidateEmail;
