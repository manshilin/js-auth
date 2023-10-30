class User {
    static #list = [];
    static USER_ROLE = {
      USER: 1,
      ADMIN: 2,
      DEVELOPER: 3,
    };
  
    constructor({ email, password, role }) {
      this.email = String(email).toLowerCase();
      this.password = password;
      this.role = User.#convertrole(role);
    }
  
    static #convertrole = (role) => {
      role = Number(role);
      if (isNaN(role)) {
        role = this.USER_ROLE.USER;
      }
      role = Object.values(this.USER_ROLE).includes(role) ? role : this.USER_ROLE.USER;
      return role;
    }

    static create(data) {
        const user = new User(data);
        console.log(user);
        
        this.#list.push(user);
        console.log(this.#list);
    }

    static getByEmail(email) {
        return this.#list.find(user => user.email === email) || null;
    }
  }
  
  module.exports = {
    User,
  };
  