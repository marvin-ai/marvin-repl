const Docker = require('node-docker-api').Docker
const fs = require('fs')
const docker = new Docker({ 
	socketPath: '/var/run/docker.sock',
    cert: fs.readFileSync('cert.pem'),
    key: fs.readFileSync('key.pem')
})

var imageName = 'marvinaiplatform/marvin-automl:0.0.1'
var containerName = 'docker-api-test'

// Engine-generate command here is mapped to a simple container start up.
function engineGenerateSDK(imageName, containerName) {
	docker.container.create({
		Image: imageName,
		name: containerName
	})
	  .then(container => container.start())
	  .then(container => container.logs({
	  	follow: true,
	  	stdout: true,
	  	stderr: true
	  }))
	  .then(stream => {
	  	stream.on('data', info => console.log(info))
	  	stream.on('error', err => console.log(err))
	  })
	  .catch(error => console.log(error))
}