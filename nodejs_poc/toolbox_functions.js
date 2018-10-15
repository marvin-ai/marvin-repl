// Engine generate command module
'use strict';

const {Docker} = require('node-docker-api');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const repl = require('repl');

function notebookSDK() {

	let _container;

	// Log capture
	const promisifyStream = stream => new Promise((resolve, reject) => {
		stream.on('data', data => console.log(data.toString()))
		stream.on('end', resolve)
		stream.on('error', reject)
	});

	// Start container, run engine generate command and capture logs
	docker.container.create({
		Image: 'marvinaiplatform/marvin-automl:0.0.1',
		Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ],
		name: 'docker-api-test'
	})
	.then(container => container.start())
	.then(container => {
		_container = container
		return container.exec.create({
			AttachStdout: true,
			AttachStderr: true,
			Cmd: [ '/bin/bash', '-c', 'source /usr/local/bin/virtualenvwrapper.sh ; workon marvin-engine-env ; cd /opt/marvin/engine/ ; marvin notebook --allow-root -p 9999 ' ]
		})
	})
	.then(exec => {
		return exec.start({ Detach: false })
	})
	.then(stream => promisifyStream(stream))
	.catch(error => console.log(error));
}

var replServer = repl.start({
	prompt: "marvin > ",
});

replServer.context.notebook = notebookSDK