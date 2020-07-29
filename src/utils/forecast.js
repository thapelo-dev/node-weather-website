const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=ae2ccb34f6f110b998fa081d0fc9cf96&query=' + latitude + ',' + longitude;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      const data = body.current;
      callback(undefined, {
        message: `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out, and humidity is ${data.humidity}.`,
      })
    }
  })
}

module.exports = forecast