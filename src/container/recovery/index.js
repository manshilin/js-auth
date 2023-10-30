import { Form, REG_EXP_EMAIL} from "../../script/form"



class RecoveryForm extends Form {
  FIELD_NAME = {
  EMAIL: 'email',
  
  }
  FIELD_ERROR = {
    IS_EMPTY: 'is_empty',
    IS_BIG: 'Дуже довге значення, преберіть зайве',
    EMAIL: 'Невірний формат email',
  }
  validate = (name, value) => {
    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL;
      }
    if (String(value).length === 0) {
      return this.FIELD_ERROR.IS_EMPTY;
    }
   
    }
    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG;
    }
  }
 
  submit = async () => {
    if (this.disabled === true) {
      this.validateAll();
    } else {
      this.setAlert('progress', 'Зачекайте, дані відправляються...');
    }
    try {
      const res = await fetch('/recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: this.convertData()
      });
      const data = await res.json();
      if (res.ok) {
        this.setAlert('success', data.message);
        location.assign('/recovery-confirm');
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
        [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL]
      }
    )
  }
}

window.recoveryForm = new RecoveryForm()
