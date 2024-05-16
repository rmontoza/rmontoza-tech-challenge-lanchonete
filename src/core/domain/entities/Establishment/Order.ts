import Costumer from '../Customer/Customer';
export default class Order {
    public id: string;
    public costumer: Costumer;
    public status: string;
    public items: string[];
  
    constructor(id: string, costumer: Costumer, status: string, items: string[]) {
      this.id = id;
      this.costumer = costumer;
      this.status = status;
      this.items = items;
    }
  }
  