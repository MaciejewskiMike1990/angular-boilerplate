export class EmailValidator {

  static emailValidator(email): any {
    if (email.pristine) {
      return null;
    }
    const REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (REGEX.test(email.value)) {
      return null;
    }
    return {
      invalidEmail: true,
    };
  }
}
