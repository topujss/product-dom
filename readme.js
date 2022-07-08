// MERN 6-29-22 https://www.youtube.com/watch?v=Mz_10hA1T1k  1:16:05 / 1:45:26 << start from this.

// Learned:

/** Dom FB timeline
 *
 */

// get elements
const main_form = document.getElementById('post-add-me');
const msg = document.querySelector('.msg');
const all_post = document.querySelector('.all-post');

// get all post function
const getAllPost = () => {
	let post = readLsData('fb_post');
	let list = '';

	if (!post) {
		all_post.innerHTML = `<div class="card shadow-sm text-center"><div class="card-body">No post found</div></div>`;
		return false;
	}

	post.reverse().map((data) => {
		list += `
	  <div class="fb-timeline my-4">
	    <div class="card shadow-sm overflow-hidden rounded-3">
	      <div class="card-body p-2">
	        <div class="post-auth">
	          <div class="u-info">
	            <img src="${data.aphoto}" alt="" />
	            <div class="details">
	              <span>${data.aname}</span>
	              <small>
	                Just Now
	                <i class="bi bi-dot"></i>
	                <i class="bi bi-globe"></i>
	              </small>
	            </div>
	          </div>
	          <div class="dropdown">
	            <a href="#" id="dropdownMenuLink" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
	            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
	              <li><a class="dropdown-item" href="#">edit</a></li>
	              <li><a class="dropdown-item w-100" href="#">Delete</a></li>
	            </ul>
	          </div>
	        </div>
	        <div class="post-content my-2">
	          <p>${data.pdesc}</p>
	        </div>
	        <div class="post-timeline"></div>
	      </div>
				${data.pphoto ? `<img src="${data.pphoto}" class="w-100" alt="" />` : ''}
	      <div class="post-react-area d-flex">
	        <div class="react-box">
	          <i class="bi bi-hand-thumbs-up"></i>
	          <span>like</span>
	        </div>
	        <div class="react-box">
	          <i class="bi bi-chat-square"></i>
	          <span>comment</span>
	        </div>
	        <div class="react-box">
	          <i class="bi bi-box-arrow-up-right"></i>
	          <span>share</span>
	        </div>
	      </div>
	    </div>
	  </div>`;
	});

	all_post.innerHTML = list;
};
getAllPost();

main_form.onsubmit = (e) => {
	e.preventDefault();

	//Form Data get by Object
	const form_data = new FormData(e.target);
	const data = Object.fromEntries(form_data.entries());
	const { aname, aphoto, pdesc, pphoto } = Object.fromEntries(form_data.entries());

	// validation
	if (!aname || !aphoto || !pdesc) {
		msg.innerHTML = alertFunction('Fields cant be empty');
	} else {
		createLsData('fb_post', data);
		e.target.reset();
		getAllPost();
	}
	console.log(main_form);
};
