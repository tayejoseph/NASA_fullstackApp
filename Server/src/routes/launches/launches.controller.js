const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
} = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
  res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req, res) {
  const launch = req.body

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: 'Missing required field launch property',
    })
  }
  launch.launchDate = new Date(launch.launchDate)
  if (isNaN(launch.ßlaunchData)) {
    return res.status(400).json({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      error: 'Invalid launch date',
    })
  }
  addNewLaunch(launch)
  res.status(201).json(launch)
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id)

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: 'Launch not found',
    })
  }

  const aborted = abortLaunchById(launchId)
  return res.status(200).json(aborted)
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
}
