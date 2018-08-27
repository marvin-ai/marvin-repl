.PHONY: help stubs client server gen_key

help:
	@echo "    stubs"
	@echo "        Generate gRPC code."
	@echo "    client"
	@echo "        Start client."
	@echo "    server"
	@echo "        Start server."
	@echo "    gen_key"
	@echo "        Generate credential."

docker-notebook:
	docker run --name ubuntu_bash -p 8888:8888 --rm -d -t ubuntu
	docker exec ubuntu_bash sh -c "apt-get update; apt-get -y upgrade; apt-get install -y python-dev python-pip"
	docker exec ubuntu_bash sh -c "pip install notebook"
	docker exec ubuntu_bash sh -c "jupyter-notebook --ip=0.0.0.0 --allow-root"
