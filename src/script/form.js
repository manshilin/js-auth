export const REG_EXP_EMAIL = new RegExp('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,}$');
export const REG_EXP_PASSWORD = new RegExp('^(?=.*\\d)(?=.*[a-zA-Z]).{8,}$');


export class Form {
  FIELD_NAME = {
    EMAIL: 'email',
    PASSWORD: 'password',
    PASSWORD_AGAIN: 'password_again',
    ROLE: 'role',
    IS_CONFIRM: 'is_confirm',
  };

  FIELD_ERROR = {
    IS_EMPTY: 'Поле не може бути порожнім',
    IS_BIG: 'Занадто довге значення, будь ласка, скоротіть',
    EMAIL: 'Невірний формат email',
    PASSWORD: 'Пароль має містити не менше 8 символів і містити цифри, маленькі та великі літери',
    PASSWORD_AGAIN: 'Паролі не співпадають',
    NOT_CONFIRM: 'Ви не підтвердили умови',
    ROLE: 'Ви не обрали роль',
  };

  value = {};
  error = {};
  disabled = true;

  change = (name, value) => {
    const error = this.validate(name, value);
    this.value[name] = value;

    if (error) {
      this.setError(name, error);
      this.error[name] = error;
    } else {
      this.setError(name, null);
      delete this.error[name];
    }
    this.checkDisabled();
  };

  setError = (name, error) => {
    const span = document.querySelector(`.form__error[name="${name}"]`);
    const field = document.querySelector(`.validation[name="${name}"]`);
    
    if (span) {
      span.classList.toggle('form__error--active', Boolean(error));
      span.innerText = error || '';
    }
    
    if (field) {
      field.classList.toggle('validation--active', Boolean(error));
    }
  };

  checkDisabled = () => {
    let disabled = false;
    
    Object.values(this.FIELD_NAME).forEach((name) => {
      if (this.error[name] || this.value[name] === undefined) {
        disabled = true;
      }
    });

    const el = document.querySelector('.button');

    if (el) {
      el.classList.toggle('button--disabled', Boolean(disabled));
    }

    this.disabled = disabled;
  };

  validateAll = () => {
    let disabled = false;

    Object.values(this.FIELD_NAME).forEach((name) => {
      const error = this.validate(name, this.value[name]);

      if (error) {
        this.setError(name, error);
        disabled = true;
      }
    });

    this.disabled = disabled;
  };

  setAlert = (status, text) => {
    const el = document.querySelector('.alert');

    if (status === 'progress') {
      el.className = 'alert alert--progress';
    } else if (status === 'error') {
      el.className = 'alert alert--error';
    } else if (status === 'success') {
      el.className = 'alert alert--success';
    } else {
      el.className = 'alert alert--disabled';
    }

    if (text) {
      el.innerText = text;
    }
  };
}
