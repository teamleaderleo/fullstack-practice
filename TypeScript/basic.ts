type Order = {
  customer: string;
  item: string;
  amount: number;
};

const orders: Order[] = [
  { customer: "Alice", item: "Book", amount: 18 },
  { customer: "Bob", item: "Pen", amount: 25 },
  { customer: "Alice", item: "Notebook", amount: 22 },
  { customer: "Charlie", item: "Pencil", amount: 15 },
  { customer: "Bob", item: "Eraser", amount: 30 },
];

const totals: Record<string, number> = {};

for (const order of orders) {
  if (order.amount >= 20) {
    if (!(order.customer in totals)) {
      totals[order.customer] = 0;
    }
    totals[order.customer] += order.amount;
  }
}

const sortedCustomers = Object.keys(totals).sort();

for (const customer of sortedCustomers) {
  console.log(`${customer}: ${totals[customer]}`);
}
