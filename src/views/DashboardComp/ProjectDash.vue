<template>
    <div class="template">
      <div class="upper-title">
        <h1>Projects</h1>
        <button class="add">Find Projects</button>
      </div>
      <div class="filter">
        <button>Filter</button>
      </div>
      <table class="product-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Collaborators</th>
            <th>Owner</th>
            <th>Estimated Finish Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ product.item }}</td>
            <td>{{ product.category }}</td>
            <td :class="product.status === 'Active' ? 'status-active' : 'status-disabled'">
              {{ product.status }}
            </td>
            <td>{{ product.sales }}</td>
            <td>{{ product.stock }}</td>
            <td>${{ product.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          { item: "Ocean", category: "Furniture", status: "Active", sales: 11, stock: 36, price: 560 },
          { item: "Lou", category: "Kitchen", status: "Disabled", sales: 6, stock: 46, price: 710 },
          { item: "Yellow", category: "Decoration", status: "Active", sales: 61, stock: 56, price: 360 },
          { item: "Dreamy", category: "Bedroom", status: "Disabled", sales: 41, stock: 66, price: 260 },
          { item: "Boheme", category: "Furniture", status: "Active", sales: 32, stock: 40, price: 350 },
          { item: "Sky", category: "Bathroom", status: "Disabled", sales: 22, stock: 44, price: 160 },
          { item: "Midnight", category: "Furniture", status: "Active", sales: 23, stock: 45, price: 340 },
          { item: "Palm", category: "Decoration", status: "Active", sales: 24, stock: 46, price: 60 },
          { item: "Forest", category: "Living Room", status: "Active", sales: 41, stock: 16, price: 270 },
          { item: "Sand", category: "Living Room", status: "Disabled", sales: 52, stock: 16, price: 230 },
          { item: "Autumn", category: "Decoration", status: "Active", sales: 21, stock: 46, price: 252 },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .template {
  
    border: 20px solid transparent;
    display: flex;
    flex-direction: column;
  }

  .add{
    background-color: rgb(110, 110, 255);
    border: none;
    color:white;
    font-size: 18px;
    padding: 5px;
    border-radius: 5px;
  }
  
  .upper-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
 
  }

  .filter{
    margin-left: auto;
    margin-bottom: 10px;



  }

  .filter button{
    background-color: bisque;
    border: none;
    border-radius: 10px;
    color: black;
    padding: 5px;
    font-size: 17px;

  }
  

  
  .product-table {
   
    border-collapse: collapse;
  }
  
  .product-table th,
  .product-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .product-table th {
    background-color: #f4f4f4;
  }
  
  .status-active {
    color: green;
  }
  
  .status-disabled {
    color: red;
  }
  </style>
  