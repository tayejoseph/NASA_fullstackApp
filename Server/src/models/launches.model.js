const launches = new Map()

let latestFlightNumber = 100

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exporation X',
  rocket: 'Explorer IS1',
  launchData: new Date('December 27 2030'),
  destination: 'keler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
}

launches.set(launch.flightNumber, launch)

function existsLaunchWithId(launchId) {
  return launches.has(launchId)
}

function getAllLaunches() {
  return Array.from(launches.values())
}

function addNewLaunch(launch) {
  latestFlightNumber++

  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      upcoming: true,
      success: true,
      customers: ['Zero to Mastery'],
      flightNumber: latestFlightNumber,
    }),
  )
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId)
  aborted.upcoming = false
  aborted.success = false
  return aborted
}

module.exports = {
  launches,
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
}
