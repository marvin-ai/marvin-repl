const Docker = require('node-docker-api').Docker
const docker = new Docker({ socketPath: '/var/run/docker.sock' })

var imageName = 'marvinaiplatform/marvin-automl:0.0.1'
var containerName = 'docker-api-test'

// Creation and management of docker container.
function containerManagement(imageName, containerName) {
	docker.container.create({
		Image: imageName,
		name: containerName
	})
	  .then((container) => container.start())
	  // .then((container) => container.stop())
	  // .then((container) => container.restart())
	  // .then((container) => container.delete({ force: true }))
	  .catch((error) => console.log(error))
}


// Create and get container's logs.
function containerLogs(imageName, containerName) {
	docker.container.create({
		Image: imageName,
		name: containerName
	})
	  .then(container => container.logs({
	  	follow: true,
	  	stdout: true,
	  	stderr: true
	  }))
	  .then(stream => {
	  	stream.on('data', info => console.log(info))
	  	stream.om('error', err => console.log(err))
	  })
	  .catch(error => console.log(error))
}