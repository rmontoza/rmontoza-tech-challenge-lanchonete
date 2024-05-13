export default class Order {
    public id: string;
    public customerName: string;
    public status: string;
    public items: string[];
  
    constructor(id: string, customerName: string, status: string, items: string[]) {
      this.id = id;
      this.customerName = customerName;
      this.status = status
      this.items = items;
    }
  }
  