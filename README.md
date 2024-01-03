# Restaurant-App

**Abstract:**

The restaurant menu application is a web-based platform designed to streamline the ordering process for customers and facilitate efficient management for restaurant staff. The application provides an intuitive user interface, allowing customers to browse through an extensive menu categorized into soups, starters, main courses, snacks, desserts, and drinks.

Key Features:

1. **Dynamic Menu Filtering:**
   - Users can filter the menu items based on categories, such as soups, starters, etc.
   - The application dynamically fetches and updates menu data from the server based on the selected category.

2. **Order Management:**
   - Customers can easily add items to their orders, specifying quantities for each menu item.
   - The application calculates the total amount for each item and maintains a real-time order list.

3. **Order Review:**
   - Customers can review their order before submission, providing a summary of selected items and quantities.

4. **Persistence:**
   - Order data is temporarily stored locally, ensuring a seamless user experience during the ordering process.

5. **Scalability:**
   - The application is designed to scale with additional features, such as real-time updates, and integration with a backend database for persistent storage of menu items and orders.

The restaurant menu application enhances the overall dining experience by combining a user-friendly interface with dynamic menu updates and efficient order management, contributing to increased customer satisfaction and operational efficiency for the restaurant.

## Installation
```
npm install express mongoose body-parser dotenv ejs multer
```

## Routes
1. Home Screen.
```
/
```
2. To check out the Menu.
```
/menu
```
3. To Review the Items you added to the list.
```
/menu/get-orders
```
4. To add new Item to the Menu.
```
/additem
```
5. To get the Kitchen View.
```
/kitchenview
```
6. Disclaimer
```
/disclaimer
```
