$(document).ready(function () {
   let cart = [];

   // Cart Toggle Functionality
   $('#cart-toggle').click(function () {
      $('.cart-sidebar, .cart-overlay').addClass('active');
   });

   $('#close-cart, .cart-overlay').click(function () {
      $('.cart-sidebar, .cart-overlay').removeClass('active');
   });

   // Function to update cart count
   function updateCartCount() {
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      $('#cart-count').text(count);
   }

   // Function to update cart total
   function updateCartTotal() {
      const total = cart.reduce(
         (sum, item) => sum + item.price * item.quantity,
         0
      );
      $('#cart-total').text(total.toFixed(2));
   }

   // Function to render cart items
   function renderCart() {
      const cartItems = $('#cart-items');
      cartItems.empty();

      cart.forEach((item) => {
         const cartItem = $('<div>')
            .addClass('cart-item')
            .append(
               $('<img>').attr('src', item.image).attr('alt', item.name),
               $('<div>')
                  .addClass('cart-item-details')
                  .append(
                     $('<h4>').text(item.name),
                     $('<p>')
                        .addClass('cart-item-price')
                        .text(`$${item.price.toFixed(2)}`),
                     $('<p>').text(`Quantity: ${item.quantity}`)
                  ),
               $('<button>')
                  .addClass('remove-from-cart')
                  .html('<i class="fas fa-trash"></i>')
                  .click(() => removeFromCart(item.id))
            );
         cartItems.append(cartItem);
      });

      updateCartCount();
      updateCartTotal();
   }

   // Function to add item to cart
   function addToCart(product) {
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
         existingItem.quantity += 1;
      } else {
         cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
         });
      }

      renderCart();
   }

   // Function to remove item from cart
   function removeFromCart(productId) {
      cart = cart.filter((item) => item.id !== productId);
      renderCart();
   }

   // Checkout functionality
   $('#checkout').click(function () {
      if (cart.length === 0) {
         alert('Your cart is empty!');
         return;
      }
      alert('Thank you for your purchase!');
      cart = [];
      renderCart();
      $('.cart-sidebar, .cart-overlay').removeClass('active');
   });

   // Function to fetch and display perfumes
   function fetchAndDisplayPerfumes() {
      $.ajax({
         url: 'https://my-json-server.typicode.com/RaghadSbe/Perfume-store/perfumes',
         method: 'GET',
         success: function (products) {
            displayPerfumes(products);
         },
         error: function (xhr, status, error) {
            console.error('Error fetching products:', error);
            $('.product-grid').html(
               '<p>Error loading products. Please try again later.</p>'
            );
         },
      });
   }

   // Display perfumes
   function displayPerfumes(items) {
      $('.product-grid').empty();

      items.forEach(function (perfume) {
         const productCard = $('<div>')
            .addClass('product-card')
            .append(
               $('<img>').attr('src', perfume.image).attr('alt', perfume.name),
               $('<h3>').text(perfume.name),
               $('<p>').addClass('brand').text(perfume.brand),
               $('<p>').text(perfume.description),
               $('<p>')
                  .addClass('price')
                  .text('$' + perfume.price.toFixed(2)),
               $('<p>')
                  .addClass('stock')
                  .text('In Stock: ' + perfume.stock),
               $('<button>')
                  .addClass('add-to-cart')
                  .text('Add to Cart')
                  .click(() => addToCart(perfume))
            );

         $('.product-grid').append(productCard);
      });
   }

   // Search functionality
   $('#search-input').on('input', function () {
      const searchTerm = $(this).val().toLowerCase();

      if (searchTerm === '') {
         fetchAndDisplayPerfumes();
      } else {
         $.ajax({
            url: 'https://my-json-server.typicode.com/RaghadSbe/Perfume-store/perfumes',
            method: 'GET',
            success: function (products) {
               const filteredPerfumes = products.filter(
                  (perfume) =>
                     perfume.name.toLowerCase().includes(searchTerm) ||
                     perfume.description.toLowerCase().includes(searchTerm) ||
                     perfume.brand.toLowerCase().includes(searchTerm)
               );
               displayPerfumes(filteredPerfumes);
            },
            error: function (xhr, status, error) {
               console.error('Error fetching products for search:', error);
            },
         });
      }
   });

   // Initial fetch and display of products
   fetchAndDisplayPerfumes();
});
