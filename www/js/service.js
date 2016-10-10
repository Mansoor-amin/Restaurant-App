angular.module('starter')


.service("OrderService",function(){
    var orders = [];

    this.addOrder = function(item){
        if(orders.indexOf(item) !== -1){
          orders[orders.indexOf(item)].quantity += 1;
          console.log(orders);

          return;
        }
      orders.push(item);
      orders[orders.indexOf(item)].quantity = 1;
      console.log(orders);
    };
  this.removeOrder = function(item){
    if(orders.indexOf(item) !== -1 && orders[orders.indexOf(item)].quantity >1){
      orders[orders.indexOf(item)].quantity -= 1;
      console.log(orders);
      return;
    }
    orders.splice(orders[orders.indexOf(item)],1);
  console.log(orders);
    };

    this.exportOrders =function(){
        return orders;
   }

  });
