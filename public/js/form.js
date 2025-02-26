function showError(message) {
    let errorMessage = document.getElementById('errorMessage')
    errorMessage.textContent = message
    errorMessage.style.display = 'block'

    // Opcional: Ocultar el mensaje después de unos segundos
    setTimeout(() => errorMessage.style.display = "none", 2600)
}

function showSuccess(message) {
    let successMessage = document.getElementById('successMessage')
    successMessage.textContent = message
    successMessage.style.display = "block"

    // Opcional: Ocultar el mensaje después de unos segundos
    setTimeout(() => successMessage.style.display = "none", 2600)
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault()  // Evita que el formulario recargue la página

        let formData = new FormData(this)
        let submitButton = this.querySelector('button[type="submit"]')

        // Deshabilita el botón para evitar múltiples envíos
        submitButton.disabled = true

        fetch('http://127.0.0.1:8000/send-email/', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            console.log(data)  // Muestra la respuesta en la consola
            if (data.message) {
                showSuccess('¡Email enviado correctamente!')
                document.getElementById('contactForm').reset()
            } else {
                showError(`Error: ${data.error || "Error desconocido"}`)
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error)
            if (error.message.includes('Failed to fetch')) {
                showError('No se pudo conectar con el servidor. Verifica tu conexión.')
            } else {
                showError(`Error al enviar el mensaje. Inténtalo más tarde.`)
            }
        })
        .finally(() => {
            // Reactiva el botón y oculta el indicador de carga
            submitButton.disabled = false
        })
    })
})

