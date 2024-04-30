
const productContainer = document.querySelector("#products-container");

async function getFood () {
  let data = await fetch(`../menu.json`);
  let food_data = await data.json();
  food_data = food_data.food;


  const groupSize = 3;

  // Create an empty array to hold the formatted list items
  const formattedItems = [];

  // Loop through the items, grouping them into <ul> tags based on groupSize
  for (let i = 0; i < food_data.length; i += groupSize) {
      // Start a new ul
      formattedItems.push('<div class="products-container">');

      // Loop through the items within this group
      for (let j = i; j < Math.min(i + groupSize, food_data.length); j++) {
          // Add each item within li tags
          let food_display_interpolated = `
          <div class="product">
            <figure><img src="${food_data[j].img_src}" alt="${food_data[j].name}" /></figure>
            <h3>${food_data[j].name}</h3>
            <p>${food_data[j].info}</p>
            <a href="#" class="btn">View Details</a>
          </div>`
          formattedItems.push(food_display_interpolated);
      }

      // Close the ul
      formattedItems.push('</div>');
  }

  // Join the formatted items into a single string
  const formattedList = formattedItems.join('');
  productContainer.innerHTML += formattedList;

}
getFood ()
