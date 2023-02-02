const formFunctions = {
  start() {
    formFunctions.addListeners();
  },

  addListeners() {
    let form = document.sampleForm;
    let fullName = document.getElementById("fullname");
    let email = document.getElementById("email");
    let password = document.getElementById("pass");
    let phone = document.getElementById("phone");
    let otp = document.getElementById("otp");
    let kits = document.getElementById("kits");
    let toggleBtn = document.getElementById("toggleBtn");

    // ----------------------------------------Change Listeners----------------------------------------
    fullName.addEventListener("change", formFunctions.nameCheck);
    email.addEventListener("change", formFunctions.emailCheck);
    phone.addEventListener("change", formFunctions.phoneCheck);

    // ----------------------------------------Typing Listeners----------------------------------------
    password.addEventListener("input", formFunctions.passCheck);
    otp.addEventListener("input", formFunctions.otpCheck);

    // ----------------------------------------Password Hide/Show Listener----------------------------------------
    toggleBtn.addEventListener("click", formFunctions.showPass);

    // ----------------------------------------Invalid Listeners----------------------------------------
    email.addEventListener("invalid", formFunctions.fail);
    fullName.addEventListener("invalid", formFunctions.fail);
    phone.addEventListener("invalid", formFunctions.fail);
    otp.addEventListener("invalid", formFunctions.fail);

    // ----------------------------------------Form Submission------------------------------------------
    form.addEventListener("submit", formFunctions.validate);
  },

  nameCheck(e) {
    let fullName = e.target;
    fullName.setCustomValidity("");
    let current = fullName.checkValidity();

    if (current) {
      let nameReg = /^(John|Jane)/i;
      if (nameReg.test(fullName.value) === false) {
        fullName.setCustomValidity("Please write down either Jane or John");
        fullName.reportValidity();
      } else {
        let span = fullname.parentElement.querySelector(".errMessage");
        span.textContent = "";
      }
    }
  },

  emailCheck(e) {
    let email = e.target;
    email.setCustomValidity("");
    let current = email.checkValidity();

    if (current) {
      let myRegx = /@yahoo.com$/i;
      if (myRegx.test(email.value) === false) {
        email.setCustomValidity("Please enter a valid yahoo email address.");
        email.reportValidity();
      } else {
        let span = email.parentElement.querySelector(".errMessage");
        span.textContent = "";
      }
    }
  },

  passCheck(e) {
    let req = [
      {
        id: "lower",
        regex: /(?=.*[a-z])/,
        message: "Please include at least one lowercase letter",
      },
      {
        id: "upper",
        regex: /(?=.*[A-Z])/,
        message: "Please include at least one uppercase letter",
      },
      {
        id: "digit",
        regex: /(?=.*[0-9])/,
        message: "Please include at least one number",
      },
      {
        id: "special",
        regex: /(?=.*[!@#\$%\^&\*])/,
        message: "Please include at least one special character",
      },
      {
        id: "length",
        regex: /(?=.{10,})/,
        message: "Please write down at least 10 characters ",
      },
    ];

    let password = e.target;
    password.setCustomValidity("");
    let current = password.checkValidity();

    req.forEach(({ id, regex, message }) => {
      let element = document.getElementById(id);
      if (regex.test(password.value)) {
        element.classList.add("valid");
      } else {
        element.classList.remove("valid");
        password.setCustomValidity(message);
        password.reportValidity();
        return;
      }
    });
  },

  phoneCheck(e) {
    let phone = e.target;
    phone.setCustomValidity("");
    let current = phone.checkValidity();

    if (current) {
      let myRegex = /^\+995\d{9}$/;
      if (myRegex.test(phone.value) === false) {
        phone.setCustomValidity(
          "Please enter your phone number starting with +995 followed by your 6 digit number without any space (e.g +995xxxxxx)"
        );
        phone.reportValidity();
      } else {
        let span = phone.parentElement.querySelector(".errMessage");
        span.textContent = "";
      }
    }
  },

  otpCheck(e) {
    let otp = e.target;
    otp.setCustomValidity("");
    let current = otp.checkValidity();

    if (current) {
      let myRegex = /^\d{4}$/;
      if (myRegex.test(otp.value) === false) {
        otp.setCustomValidity("Please provide 4 digits sent on your Cellphone");
        otp.reportValidity();
      } else {
        let span = otp.parentElement.querySelector(".errMessage");
        span.textContent = "";
      }
    }
  },

  validate(e) {
    e.preventDefault();
    let form = e.target;
    let fullName = document.getElementById("fullname");
    let email = document.getElementById("email");
    let password = document.getElementById("pass");
    let phone = document.getElementById("phone");
    let otp = document.getElementById("otp");
    let kits = document.getElementById("kits");

    console.log(`Full Name: `, fullName.willValidate);
    console.log(`Email: `, email.willValidate);
    console.log(`Password: `, password.willValidate);
    console.log(`Cellphone: `, phone.willValidate);
    console.log(`OTP: `, otp.willValidate);
    console.log(`Kits: `, kits.willValidate);
  },

  showPass() {
    let password = document.getElementById("pass");
    let toggleBtn = document.getElementById("toggleBtn");
    if (password.type === "password") {
      password.setAttribute("type", "text");
      toggleBtn.classList.add("hide");
    } else {
      password.setAttribute("type", "password");
      toggleBtn.classList.remove("hide");
    }
  },

  fail(e) {
    let field = e.target;
    console.log("invalid");
    switch (field.id) {
      case "fullname": {
        let span = field.parentElement.querySelector(".errMessage");
        span.textContent = "Please, write down either Jane or John";
        break;
      }
      case "email": {
        let span = field.parentElement.querySelector(".errMessage");
        span.textContent = "Please, provide your yahoo email";
        break;
      }

      case "phone": {
        let span = field.parentElement.querySelector(".errMessage");
        span.textContent = "Example: +995xxxxxxxxx";
        break;
      }
      case "otp": {
        let span = field.parentElement.querySelector(".errMessage");
        span.textContent = "Enter 4 digits sent on your phone";
        break;
      }
    }
  },
};

document.addEventListener("DOMContentLoaded", formFunctions.start);
