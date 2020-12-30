const request = require("request")

/**
 * forecast
 * @param city
 * @param callback
 */
const forecast = (city, callback) => {
    console.log("Getting city Key")
    const url = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=GVQGUMhkBCrHKeRszDIwTd27ONBRCHQ9&q="+city;
    request(
        url,
        {
            method: 'get',
            json: true
        },
        (error, {body}, {Code, Message} = {}) => {
            let city = null
            let city_key = null

            if (error) {
                callback("Unable to connect with the location api!", undefined)
            } else if(Message) {
                callback(Message, undefined)
            } else if(!body) {
                callback('City Not found', undefined)
            } else {
                const result = body

                if(result.length > 0){
                    city_key =  result[0].Key
                    city =  result[0].LocalizedName +', '+ result[0].Country.LocalizedName
                }
                callback(undefined, {city, city_key})
            }
        }
    )
}


const display = (city, city_key, callback) => {
    console.log('Getting weather')
    const url = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/'+city_key+'?apikey=GVQGUMhkBCrHKeRszDIwTd27ONBRCHQ9&language=en-us&metric=true&details=true'
    request(
        url,
        {
            method: 'get',
            json: true
        },
        (error, {body}, {Code, Message} = {}) => {
            let forecast, location = undefined
            if (error) {
                callback("Unable to connect with the forecast api!", undefined)
            } else if(Message) {
                callback(Message, undefined)
            } else if(!body) {
                    callback('Weather Not found', undefined)
            } else {
                const daily_forcast = body.DailyForecasts[0]
                callback(undefined, {
                    forecast: "Today the minimum temperature will be "+daily_forcast.Temperature.Minimum.Value+" C. There is a "+daily_forcast.Day.RainProbability+"% chance of rain.",
                    location:city
                })
            }
        }
    )
}


module.exports ={
    forecast: forecast,
    display: display
}
