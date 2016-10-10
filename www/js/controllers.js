angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$rootScope, firebaseURL, $firebaseArray) {


})

.controller('cartCtrl', function($scope,$rootScope,OrderService, firebaseURL, $firebaseArray) {

      $scope.orders = OrderService.exportOrders();
      $scope.addToCart = OrderService.addOrder;
      $scope.removeToCart = OrderService.removeOrder;
      $scope.user = {};

    $scope.grandTotal=0;
    $scope.calculateTotal=function(){
    for (i=0; i<$scope.orders.length; i++){
      $scope.grandTotal+= $scope.orders[i].quantity * $scope.orders[i].price;
    }
    };
    $scope.uid = localStorage.getItem('uid');
    var OrderRef = new Firebase(firebaseURL+ '/orders/'+$scope.uid);
    $scope.ORDER = $firebaseArray(OrderRef);

    $scope.saveOrder= function(user){
      debugger;
      $scope.ORDER.$add({
        "user" :  user,
        "order" : OrderService.exportOrders(),
        "grandTotal": $scope.grandTotal
      });
    }


})

.controller('MenuCtrl', function($scope,$stateParams, firebaseURL, $firebaseArray, OrderService) {
    var id = $stateParams.id;
    console.log($stateParams);
    var menuRef = new Firebase(firebaseURL+ '/restaurants/'+id+'/menu');
    $scope.menu = $firebaseArray(menuRef);

    $scope.addToCart = OrderService.addOrder;
    $scope.removeToCart = OrderService.removeOrder;

})

.controller('LoginCtrl', function($scope, firebaseURL, $rootScope,$state) {

    var ref = new Firebase(firebaseURL);
    $scope.loginUser = function(user){
      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          alert("Login Failed!", error);
        } else {
          $rootScope.userData = authData;
          localStorage.setItem('uid',authData.uid);
          localStorage.setItem('userData',authData);
          $state.go('app.Home')
        }

      });
    };
})
.controller('HomeCtrl', function($scope, firebaseURL, $firebaseArray) {
    var restaurantsRef = new Firebase(firebaseURL+ '/restaurants');
    $scope.restaurants = $firebaseArray(restaurantsRef);

});

