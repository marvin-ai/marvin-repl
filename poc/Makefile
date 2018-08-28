.PHONY: help stubs client server gen_key

help:
	@echo "    docker-notebook"
	@echo "        Start notebook inside a container"
	@echo "    docker-server"
	@echo "        Start dockerd with TLS."

docker-server:
	sudo service docker stop
	sudo dockerd --tlsverify --tlscacert=ca.pem --tlscert=server-cert.pem --tlskey=server-key.pem -H=0.0.0.0:2376


docker-notebook:
	docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=localhost:2376 run --name ubuntu_bash -p 8888:8888 --rm -d -t ubuntu
	docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=localhost:2376 exec ubuntu_bash sh -c "apt-get update; apt-get -y upgrade; apt-get install -y python-dev python-pip"
	docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=localhost:2376 exec ubuntu_bash sh -c "pip install notebook"
	docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=localhost:2376 exec ubuntu_bash sh -c "jupyter-notebook --ip=0.0.0.0 --allow-root"
