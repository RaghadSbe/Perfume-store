$(document).ready(function() {
    // Fetch featured products from the API
    $.ajax({
        url: 'http://localhost:3000/perfumes',
        method: 'GET',
        success: function(data) {
            // Get first 3 products
            const featuredProducts = data.slice(0, 3);
            
            // Display featured products
            featuredProducts.forEach(function(perfume) {
                const productCard = $('<div>').addClass('product-card').append(
                    $('<img>').attr('src', perfume.image).attr('alt', perfume.name),
                    $('<h3>').text(perfume.name),
                    $('<p>').text(perfume.description),
                    $('<p>').addClass('price').text('$' + perfume.price.toFixed(2)),
                );

                $('#featured-products').append(productCard);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching products:', error);
            $('#featured-products').html('<p>Error loading featured products</p>');
        }
    });
}); 