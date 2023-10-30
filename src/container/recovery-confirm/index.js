import { Form, REG_EXP_PASSWORD } from "../../script/form"


class RecoveryConfirmForm extends Form {

  FIELD_NAME = {
    CODE: 'code',
    PASSWORD: 'password',
    PASSWORD_AGAIN: 'passwordAgain',

  };

  FIELD_ERROR = {
    IS_EMPTY: 'Поле не може бути порожнім',
    IS_BIG: 'Занадто довге значення, будь ласка, скоротіть',
    PASSWORD: 'Пароль має містити не менше 8 символів і містити цифри, маленькі та великі літери',
    PASSWORD_AGAIN: 'Паролі не співпадають',
   
  };

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }
    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG
    }

    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD
      }
    }
    if (name === this.FIELD_NAME.PASSWORD_AGAIN) {
      if (String(value) !== String(this.value[this.FIELD_NAME.PASSWORD])) {
        return this.FIELD_ERROR.PASSWORD_AGAIN
      }
    }
  }
  submit = async () => {
    if (this.disabled === true) {
      this.validateAll();
    } else {
      this.setAlert('progress', 'Зачекайте, дані відправляються...');
    }
    try {
      const res = await fetch('/recovery-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: this.convertData()
      });
      const data = await res.json();
      if (res.ok) {
        this.setAlert('success', data.message);
      } else {
        this.setAlert('error', data.message);
      }
    } catch (error) {
      this.setAlert('error', error.message);
    }
  }
  

  convertData = () => {
    return JSON.stringify(
      {
        [this.FIELD_NAME.CODE]: Number (this.value[this.FIELD_NAME.CODE],),
        [this.FIELD_NAME.PASSWORD]: this.value[this.FIELD_NAME.PASSWORD],
      }
    )
  }
}


window.recoveryConfirmForm = new RecoveryConfirmForm()
