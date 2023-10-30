class Confirm {
  static #list = [];
  constructor(data) {
    this.code = Confirm.generateCode();
    this.data = data;
  }
  
  static generateCode = () => 
     Math.floor(Math.random() * 9000) + 1000;

     static create = (data) => {
      const confirm = new Confirm(data); // Create a new Confirm object
      this.#list.push(confirm);
      setTimeout(() => {
          this.delete(confirm.code);
      }, 24 * 60 * 60 * 1000); // 24 hours
  
      // Return the generated code
      return confirm.code;
  }
  
   
    static delete = (code) => {
      const length = this.#list;
      this.#list = this.#list.filter((confirm) => confirm.code !== code);
      return length > this.#list.length;
    }

    static getData = (code) => {
      const obj = this.#list.find(item=> item.code === code);
      return obj ? obj.data : null;
    }
}
  
  module.exports = {
    Confirm,
  }
  