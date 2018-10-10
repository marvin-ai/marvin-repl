const Docker = require('node-docker-api').Docker;
const fs = require('fs');
const repl = require('repl');
const docker = new Docker({ 
	socketPath: '/var/run/docker.sock',
    cert: fs.readFileSync('cert.pem'),
    key: fs.readFileSync('key.pem')
});

// Engine-generate command here is mapped to a simple container start up.
function engineGenerateSDK() {
	docker.container.create({
		Image: 'marvinaiplatform/marvin-automl:0.0.1',
		name: 'docker-api-test'
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

var replServer = repl.start({
	prompt: "marvin >",
});

replServer.context.engine_generate = engineGenerateSDK
