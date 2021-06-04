function errorHandler(error) {
  switch (error) {
    case `"username" is not allowed to be empty`:
      return 'error.user.empty';

    case `"password" is not allowed to be empty`:
      return 'error.password.minumun.lenght';

    case `"password" length must be at least 8 characters long`:
      return 'error.password.minumun.lenght';

    case `"repeatedPassword" is not allowed to be empty`:
      return 'error.repeated.password.empty';

    case `"repeatedPassword" length must be at least 8 characters long`:
      return 'error.repeated.password.minumun.lenght';

    case `"email" is not allowed to be empty`:
      return 'error.email.not.valid';

    case `"email" must be a valid email`:
      return 'error.email.not.valid';

    case `"birthDate" is not allowed to be empty`:
      return 'error.birthday';

    case `"firstName" is not allowed to be empty`:
      return 'error.first.name';

    case `"lastName" is not allowed to be empty`:
      return 'error.last.name';

    case `"Parece que ya existe un usuario con ese correo.`:
      return 'error.user.exists';

    default:
      return 'error.default';
  }
}

export default errorHandler;
