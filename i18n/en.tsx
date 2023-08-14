const lng = {
  yup: {
    mixed: {
      default: 'This field is invalid',
      required: 'This field must be completed',
      oneOf: 'This field must contain one of these {{values}} values',
      notOneOf: 'This field must not contain any of these {{values}} values',
      defined: 'This field must be defined',
    },
    string: {
      default: 'This field is invalid',
      required: 'This field must be completed',
      length: 'This field must be {{length}} characters long',
      min: 'This field must be at least {{min}} characters long',
      max: 'This field must have a maximum length of {{max}} characters',
      matches: 'This field must respect the regex ({{regex}})',
      email: 'The email address entered is invalid',
      url: 'This field must contain a valid url (Starting with http:// or https://)',
      uuid: 'This field must be a valid UUID',
      trim: 'This field must be trimmed (no spaces before or after)',
      lowercase: 'This field must be in lower case',
      uppercase: 'This field must be capitalized',
      phone: 'Invalid phone number',
      alphabet: 'This field may only contain letters, hyphens or spaces',
      digits: 'This field must contain numbers only',
    },
    number: {
      min: 'This field must be greater than or equal to {{min}}',
      max: 'This field must be smaller than or equal to {{max}}',
      lessThan: 'This field must be smaller than {{less}}',
      moreThan: 'This field must be smaller than {{more}}',
      positive: 'This field must be a positive number',
      negative: 'This field must be a negative number',
      integer: 'This field must be an integer',
      type: 'This field must be a number',
    },
    date: {
      min: 'This field must contain a date after {{min}}',
      max: 'This field must contain a date before {{max}}',
      dateAfterPreviousValue: 'This field must contain a date that occurs after the previous date',
    },
    boolean: {
      isValue: 'This field must have the value {{value}}',
    },
    object: {
      noUnkown: 'This field contains unknown keys',
    },
    array: {
      min: 'This field must contain at least {{min}} element(s)',
      max: 'This field must contain a maximum of {{max}} element(s)',
      length: 'This field must contain {{length}} element(s)',
    },
    password: {
      length: 'Your password must be between 8 and 20 characters long',
      notIdentical: 'Your two passwords are not identical',
    },
  },
  navbar: {},
  components: {
    form: {
      save: 'Send',
      add: 'Add',
      delete: 'Delete',
      cancel: 'Cancel',
      confirm: 'Confirm',
      search: 'Search',
    },
    atoms: {
      alert: {
        wip: 'This feature is under development !',
        info: 'Info',
        error: 'Error',
        success: 'Success',
        changesSaved: 'Changes have been saved.',
        errorTryLater: 'An error has occurred. Please try again later !',
        copied: 'The text has been copied !',
        close: 'Close',
        back: 'Back',
        next: 'Next',
      },
      select: {
        noOptions: 'No element',
        loading: 'Loading',
      },
      table: {
        filterBy: 'Filter by',
        search: 'Search',
        unselectAll: 'Unselect all',
        selectAll: 'Select all',
      },
    },
  },
  pages: {
    home: {
      hello: 'Hello world !',
    },
    demo: {
      isButtonLoading: 'isButtonLoading',
      phone1: 'phone1',
      phone2: 'phone2',
      dontHaveSecondPhone: 'have second phone',
      fillSame: 'fill same',
      oldPassword: 'old password',
      newPassword: 'new password',
      confirmPassword: 'confirm password',
      invalidOldPassword: 'invalid old password',
    },
  },
};

export default lng;
