document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const form = document.getElementById("registration-form")
  const tabButtons = document.querySelectorAll(".tab-button")
  const userTypeInput = document.getElementById("userType")
  const professionalFields = document.getElementById("professional-fields")
  const registrationCard = document.getElementById("registration-card")
  const successCard = document.getElementById("success-card")
  const backButton = document.getElementById("back-button")

  // Form fields
  const firstName = document.getElementById("firstName")
  const lastName = document.getElementById("lastName")
  const email = document.getElementById("email")
  const phone = document.getElementById("phone")
  const password = document.getElementById("password")
  const confirmPassword = document.getElementById("confirmPassword")
  const specialty = document.getElementById("specialty")
  const experience = document.getElementById("experience")
  const description = document.getElementById("description")

  // Error messages
  const firstNameError = document.getElementById("firstName-error")
  const lastNameError = document.getElementById("lastName-error")
  const emailError = document.getElementById("email-error")
  const phoneError = document.getElementById("phone-error")
  const passwordError = document.getElementById("password-error")
  const confirmPasswordError = document.getElementById("confirmPassword-error")
  const specialtyError = document.getElementById("specialty-error")
  const experienceError = document.getElementById("experience-error")
  const descriptionError = document.getElementById("description-error")

  // Tab switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active tab
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Update user type
      const userType = this.dataset.type
      userTypeInput.value = userType

      // Show/hide professional fields
      if (userType === "professional") {
        professionalFields.classList.remove("hidden")
      } else {
        professionalFields.classList.add("hidden")
      }

      // Clear errors
      clearErrors()
    })
  })

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Reset errors
    clearErrors()

    // Validate form
    const isValid = validateForm()

    if (isValid) {
      // Collect form data
      const formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
        userType: userTypeInput.value,
        professionalDetails:
          userTypeInput.value === "professional"
            ? {
                specialty: specialty.value,
                experience: experience.value,
                description: description.value,
              }
            : null,
      }

      // Log form data (would be sent to server in a real app)
      console.log("Form data:", formData)

      // Show success message after a short delay (simulating API call)
      setTimeout(() => {
        registrationCard.classList.add("hidden")
        successCard.classList.remove("hidden")
      }, 1000)
    }
  })

  // Back button on success screen
  backButton.addEventListener("click", () => {
    // Reset form
    form.reset()
    professionalFields.classList.add("hidden")
    tabButtons[0].click() // Reset to client tab

    // Show registration form again
    successCard.classList.add("hidden")
    registrationCard.classList.remove("hidden")
  })

  // Form validation
  function validateForm() {
    let isValid = true

    // Validate name (at least 2 characters)
    if (firstName.value.length < 2) {
      firstNameError.textContent = "El nombre debe tener al menos 2 caracteres."
      isValid = false
    }

    if (lastName.value.length < 2) {
      lastNameError.textContent = "El apellido debe tener al menos 2 caracteres."
      isValid = false
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
      emailError.textContent = "Por favor ingrese un email válido."
      isValid = false
    }

    // Validate phone (at least 8 characters)
    if (phone.value.length < 8) {
      phoneError.textContent = "Por favor ingrese un número de teléfono válido."
      isValid = false
    }

    // Validate password (at least 8 characters)
    if (password.value.length < 8) {
      passwordError.textContent = "La contraseña debe tener al menos 8 caracteres."
      isValid = false
    }

    // Validate password confirmation
    if (password.value !== confirmPassword.value) {
      confirmPasswordError.textContent = "Las contraseñas no coinciden."
      isValid = false
    }

    // Validate professional fields if user type is professional
    if (userTypeInput.value === "professional") {
      if (!specialty.value) {
        specialtyError.textContent = "Por favor ingrese su especialidad."
        isValid = false
      }

      if (!experience.value) {
        experienceError.textContent = "Por favor ingrese sus años de experiencia."
        isValid = false
      }

      if (!description.value) {
        descriptionError.textContent = "Por favor ingrese una descripción de sus servicios."
        isValid = false
      }
    }

    return isValid
  }

  // Clear all error messages
  function clearErrors() {
    const errorElements = document.querySelectorAll(".error-message")
    errorElements.forEach((element) => {
      element.textContent = ""
    })
  }
})

