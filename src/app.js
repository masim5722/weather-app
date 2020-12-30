const path = require('path')
const express =  require('express')
const hbs =  require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates')
const partialPaths = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

// setup static directory
app.use(express.static(publicDirPath))

// routes
app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Muhammad Asim'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About',
        name: 'Muhammad Asim'
    })
})

app.get('/weather', (req, res) =>{
    // if(!req.query.address){
    //     return res.send({
    //         error: 'Address is missing!'
    //     })
    // }
    forecast.forecast(req.query.address, (error, {city, city_key} ={}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast.display(city, city_key, (error, {forecast, location} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: [],
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Page Does not exist',
        name: 'Muhammad Asim'
    })
})
app.listen(port, () => {
    console.log("Starting server on "+port+" .")
})