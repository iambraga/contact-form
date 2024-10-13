let fields = document.querySelectorAll("input");
let errMsg = document.querySelectorAll("p.required-error");
let msg = document.querySelector("textarea");
let form = document.querySelector("form");
let res = document.querySelector("div#res");

let checkError = (elem, i) => {
	if (elem.value === "") {
		elem.classList.add("error");
		errMsg[i].style.display = "block";
		errMsg[i].innerText = "This field is required";
	} else if (elem.classList.contains("error")) {
		elem.classList.remove("error");
		errMsg[i].style.display = "none";
	}
};

let checkEmail = (elem, i) => {
	if (elem.value === "") checkError(elem, i);
	else {
		if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(elem.value)) {
			//errEmail.style.display = "none";
			errMsg[i].style.display = "none";
		} else {
			//errEmiil.style.display = "block";
			errMsg[i].style.display = "block";
			errMsg[i].innerText = "Please enter a valid email address";
		}
	}
};

let checkRatio = (i, elem1, elem2 = false) => {
	if (!elem1 && !elem2) {
		errMsg[i].style.display = "block";
	} else {
		errMsg[i].style.display = "none";
	}
};

fields[0].addEventListener("change", () => {
	checkError(fields[0], 0);
});

fields[1].addEventListener("change", () => {
	checkError(fields[1], 1);
});

fields[2].addEventListener("change", () => {
	checkEmail(fields[2], 2);
});

msg.addEventListener("change", () => {
	checkError(msg, 4);
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let toast = document.querySelector("div.toast-msg");
	let success = true;

	fields.forEach((field, i) => {
		checkError(field, i);
	});

	checkEmail(fields[2], 2);
	checkError(msg, 4);
	checkRatio(3, fields[3].checked, fields[4].checked);
	checkRatio(5, fields[5].checked);

	for (let i = 0; i < errMsg.length; i++) {
		if (errMsg[i].style.display == "block") {
			success = false;
			break;
		}
	}

	if (success) {
		toast.classList.add("show");

		setTimeout(function () {
			toast.classList.remove("show");
			e.target.submit();
		}, 3000);
	}
});
