import { ZodEn } from './zodEn';

const lng = {
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
  ...ZodEn,
};

export default lng;
