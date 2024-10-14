"use strict";

angular.module("phoneList").component("phoneList", {
  templateUrl: "phone-list/phone-list.template.html",
  controller: [
    "Phone",
    "$scope",
    function PhoneListController(Phone, $scope) {
      $scope.phones = Phone.query();
      $scope.originalPhones = $scope.phones;

      $scope.orderProp = "age";
      $scope.query = "";

      $scope.worker = new Worker("worker.js");

      $scope.worker.onmessage = (event) => {
        $scope.$apply(() => {
          $scope.phones = event.data;
        });
      };

      $scope.handleWorker = () => {
        if (window.Worker) {
          $scope.worker.postMessage([
            $scope.orderProp,
            $scope.originalPhones,
            $scope.query,
          ]);
        }
      };

      $scope.$on("$destroy", function () {
        $scope.worker.terminate();
      });
    },
  ],
});
