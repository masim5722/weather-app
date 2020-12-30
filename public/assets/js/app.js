console.log("Client side Javascript File")
const baseUrl = window.location.origin;

const weatherForm = document.querySelector('form')
const forecastLabel = document.getElementById('heading')
const locationLabel = document.getElementById('para')
const errorLabel = document.getElementById('error')
const card = document.getElementById('card')
const loadingLabel = document.getElementById('loading')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = document.getElementById('city').value
    const forecast = baseUrl+'/weather?address='+city
    errorLabel.classList.add("hidden");
    card.classList.add("hidden");
    if(city){
        loadingLabel.textContent = 'Getting forecast...'
        fetch(forecast).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    loadingLabel.textContent = ''
                    console.log('Error')
                    errorLabel.classList.remove("hidden");
                    card.classList.add("hidden");
                    errorLabel.innerText  = data.error
                } else{
                    loadingLabel.textContent = ''
                    errorLabel.classList.add("hidden");
                    card.classList.remove("hidden");
                    forecastLabel.textContent  = data.forecast
                    locationLabel.textContent  = data.location
                }

            })
        })
    } else{
        errorLabel.classList.remove("hidden");
        card.classList.add("hidden");
        errorLabel.textContent  = "City is required!"
    }
})

