(() => {
	const nameToId = (name, re, re2) => {
		const sanitizedName = name.replaceAll(" ", "");
		return re && re2 ? sanitizedName.replace(re2, re) : sanitizedName;
	};

	const randomDesc = () => {
		const desc = [
			"Master front-end and back-end technologies to build complete web applications.",
			"Analyze data and build intelligent systems using Python and machine learning.",
			"Learn design principles and software to create stunning visuals."
		];
		return desc[Math.floor(Math.random() * desc.length)];
	};

	let temp = [];
	let Clength = 0;
	const limit = 10;
	const list = document.getElementById("course-list");
	const main = document.getElementById("main");

	const fetchCourses = async () => {
		try {
			const response = await fetch("data/courses.json");
			temp = await response.json();
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const addItems = (json, offset) => {
		if (!json || Clength >= json.length) return;

		const itemsToAdd = json.slice(offset, offset + limit);
		itemsToAdd.forEach(item => {
			const slug = nameToId(item.name, item.re || null, item.re2 || null);
			const name = item.name.replace(item.re, item.re2);
			list.innerHTML += `<article onclick=هذعذه(atob('${btoa(slug)}')) class=course-card><img alt="${name}"class=course-img src=images/${item.ci ? item.ci : slug}.webp><div class=course-content><h4 class=course-title>${name}</h4><p class=course-desc>${randomDesc()}</p><div class=course-btn>Enroll Now</div></div></article>`;
			Clength++;
		});
	};

	const checkScroll = () => {
		const isBottom = list.getBoundingClientRect().bottom < window.innerHeight * 1.1 + 500;
		if (isBottom && main.style.display !== "none") {
			addItems(temp, Clength);
		}
	};

	const signInPopup = (id) => { // real: create embed and backlinks
		const popup = document.getElementById("signin-popup");
		main.style.display = "none";
		popup.style = "";
		popup.innerHTML = `<div id=cbl style=width:100%;height:35px;text-align:center;margin:auto;position:fixed;top:0;left:1px;z-index:999;background:#77f;opacity:.8><ul style=color:#fff;padding:0;margin:0;font-size:20px;font-family:sans-serif;line-height:1.25><li style=padding:5px;display:inline-block><a style=color:#fff;text-decoration:underline;cursor:pointer onclick=document.getElementById('signin-popup').innerHTML='',document.getElementById('main').style='' title="More Courses">More Courses</a><li style=padding:5px;display:inline-block;float:right><a onclick=document.getElementById("cbl").remove() style=color:#fff;text-decoration:none>❌</a></ul></div><embed src=${id}/ width=100% height=100% style=position:fixed;top:0;left:0>`;
	};

	fetchCourses();
	setInterval(checkScroll, 100);
	window.هذعذه = (id) => signInPopup(id);
})();