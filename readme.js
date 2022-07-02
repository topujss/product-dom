// MERN 6-15-22 http://www.youtube.com/watch?v=hJyPVk0sWqg  << start from this.
// MERN p2 6-19-22 https://www.youtube.com/watch?v=uuMLr1oFkZ4
// MERN p2 6-22-22 http://www.youtube.com/watch?v=5C7-vIobnjE

// Learned: array.find, .filter, .some, .findIndex, small shop project

/** Dom small shop project
 * array.find(item=>{return item}) /> return single value.
 * array.filter /> return multiple value.
 * array.some /> show if the item is there or not.
 * array.findIndex(item=>{return item}) /> show the index number of that item.
 */
// real clock
clock();

// Get getElements
const form = document.getElementById('new-product');
const msg = document.querySelector('.msg');
const ProductList = document.getElementById('product-list');

const singleProduct = document.querySelector('.single_product');
const editProduct = document.getElementById('edit-product');

// get all products
const getProducts = () => {
	// get all lS data
	const data = readLsData('product');

	// init list
	let list = '';

	// Check Ls Data exists
	if (data.length == 0 || !data) {
		list = `
      <tr>
        <td colspan="7" class="text-center text-danger">No products to show, add from "add product"</td>
      </tr>
    `;
	}

	//Show all data to list
	if (data && data.length > 0) {
		let finalAmmount = 0;

		//loop for data
		data.map((item, index) => {
			finalAmmount += item.price * item.quantity;
			list += `
      <tr>
        <td scope="row"><strong>${index + 1}</strong></td>
        <td>
          <img style="width: 60px;height:60px; object-fit: cover;border-radius: 0.5rem; " src="${
						item.photo
					}" alt="" />
        </td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>${item.quantity}</td>
        <td>$${item.price * item.quantity}</td>
        <td>
          <a href="#single_modal" data-bs-toggle="modal" data_index="${index}" class="pen-eye btn btn-sm btn-primary">
						<i class="bi bi-eye"></i>
					</a>
          <a href="#edit_modal" data-bs-toggle="modal" data_index="${index}" class="pen-edit btn btn-sm btn-warning">
						<i class="bi bi-pen"></i>
					</a>
          <a href="#" class="pen-trash btn btn-sm btn-danger" data_index="${index}">
						<i class="bi bi-trash2"></i>
					</a>
        </td>
      </tr>
      `;
		});

		list += `
      <tr>
        <td colspan="6" class="text-end text-success" style="padding-right:2rem">Final - $${finalAmmount}</td>
        <td></td>
      </tr>
    `;
	}

	ProductList.innerHTML = list;
};
getProducts();

// submit form
form.onsubmit = (e) => {
	e.preventDefault();

	// get form data from formData object
	let formData = new FormData(e.target);

	// get product data from array
	let productData = Object.fromEntries(formData.entries());

	// send form entries by destructuring variable
	let { name, price, quantity, photo } = Object.fromEntries(formData.entries());

	// validate form
	if (!name || !price || !quantity || !photo) {
		msg.innerHTML = alertFunction('All fields are required!');
	} else {
		// passing product value in product key to local Storage
		createLsData('product', productData);

		msg.innerHTML = alertFunction('You are good', 'success');
		// reset form - both work same
		// e.target.reset();
		form.reset();
		// By calling this function add product instantly
		getProducts();
	}
};

// View single product
ProductList.onclick = (e) => {
	e.preventDefault();

	if (e.target.classList.contains('pen-eye')) {
		//Get single data index
		let index = e.target.getAttribute('data_index');
		let data = readLsData('product');

		// destructuring data key
		const { name, price, photo, quantity } = data[index];

		// send data to modal
		singleProduct.innerHTML = `
      <img src="${photo}" class="shadow " alt="" />
      <h2>${name}</h2>
      <h5 class="text-info">Price : ${price}</h5>
      <p>Quantity: ${quantity}</p>
    `;
	}

	// Edit single product
	if (e.target.classList.contains('pen-edit')) {
		// find index id from product
		let index = e.target.getAttribute('data_index');

		// get product
		let data = readLsData('product');

		// get all the key from data index
		const { name, price, photo, quantity } = data[index];

		//set form data
		editProduct.innerHTML = `
    <div class="my-2">
      <label>Product name</label>
      <input name="name" type="text" value="${name}" class="form-control" />
    </div>
    <div class="my-2">
      <label>Product Price</label>
      <input name="price" type="number" value="${price}" class="form-control" />
    </div>
    <div class="my-2">
      <label>Product Quantity</label>
      <input type="number" name="quantity"  value="${quantity}" class="form-control" />
    </div>
    <div class="my-2 d-none">
      <label>index</label>
      <input type="hidden" name="index"  value="${index}" class="form-control" />
    </div>
    <div class="my-2">
      <img src="${photo}"class="w-75 m-auto d-block" alt="">
    </div>
    <div class="my-2">
      <label>Product photo</label>
      <input name="photo" type="url" value="${photo}" class="form-control" />
    </div>
    <div class="my-3">
      <input type="submit" value="Update now" class="py-2 btn btn-outline-info w-100" />
    </div>
    `;
	}
	// delete/remove single product
	if (e.target.classList.contains('pen-trash')) {
		let conf = confirm('Are you sure?');

		if (conf) {
			//Find index id for specific product when click
			let index = e.target.getAttribute('data_index');

			// get all data from product array
			let data = readLsData('product');

			// from product array splice/delete 1 data by index
			data.splice(index, 1);

			// update ls data after finish changes
			updataLsData('product', data);

			// Now show updated data
			getProducts();
		}
	}
};

editProduct.onsubmit = (e) => {
	e.preventDefault();

	const formData = new FormData(e.target);
	const { name, photo, quantity, price, index } = Object.fromEntries(formData.entries());

	// get all ls data
	let allData = readLsData('product');

	allData[index] = { name, price, quantity, photo };

	// updata ls data
	updataLsData('product', allData);

	// calling main function
	getProducts();
};
