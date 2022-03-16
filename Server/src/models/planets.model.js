const path = require('path')
const parser = require('csv-parse')
const fs = require('fs')

const habitablePlanets = []

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['kio_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['kio_prad'] < 1.6
  )
}

//  const promise = new Promise((resolve, reject) => {

//  })
// promise.then((result) => {

// })

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'),
    )
      .pipe(
        parser.parse({
          comment: '#',
          columns: true,
        }),
      )
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data)
        }
      })
      .on('error', (err) => {
        console.log({ err })
        reject(err)
      })
      .on('end', () => {
        resolve()
      })
  })
}

function getAllPlanets() {
  return habitablePlanets
}

module.exports = {
  planets: habitablePlanets,
  loadPlanetsData,
  getAllPlanets,
}
