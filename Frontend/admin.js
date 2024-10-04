const app = angular.module("adminPanel", []);

app.controller("adminCtrl", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.items = [];
    $scope.newItem = {};
    $scope.isEditing = false;
    $scope.editingItemId = null;

    $scope.fetchItems = async function () {
      try {
        const response = await $http.get("http://localhost:3000/items");
        $scope.items = response.data;
        $scope.$apply();
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    $scope.addItem = async function () {
      if ($scope.isEditing) {
        $scope.updateItem();
        return;
      }

      try {
        const response = await $http.post(
          "http://localhost:3000/items/create",
          $scope.newItem
        );
        $scope.items.push(response.data);
        $scope.newItem = {};
        $scope.$apply();
      } catch (error) {
        console.error("Error adding item:", error);
      }
    };

    $scope.editItem = function (item) {
      $scope.newItem = angular.copy(item);
      $scope.isEditing = true;
      $scope.editingItemId = item._id;
    };

    $scope.updateItem = async function () {
      try {
        const response = await $http.put(
          `http://localhost:3000/items/${$scope.editingItemId}`,
          $scope.newItem
        );

        const index = $scope.items.findIndex(
          (item) => item._id === $scope.editingItemId
        );
        if (index !== -1) {
          $scope.items[index] = response.data;
        }

        $scope.newItem = {};
        $scope.isEditing = false;
        $scope.editingItemId = null;
        $scope.$apply();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    };

    $scope.deleteItem = async function (itemId) {
      try {
        await $http.delete(`http://localhost:3000/items/${itemId}`);

        $scope.items = $scope.items.filter((item) => item._id !== itemId);
        alert("An item has been deleted");
        $scope.$apply();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    };

    $scope.fetchItems();
  },
]);
