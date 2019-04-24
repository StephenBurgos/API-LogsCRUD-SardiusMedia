
STAGE?=default
CF_STACK=alpha-api
REGION=us-east-1

SHELL := /bin/bash

install:
	yarn install

test:
	npm test

ssm:
ifneq (,$(wildcard ssm-params-${CF_STACK}.yml))
	AWS_REGION=$(REGION) awsenv create config/ssm-params-${CF_STACK}.yml
endif

deploy-package:
	sls deploy -v --cfstack $(CF_STACK) --stage $(STAGE) --region $(REGION)


deploy: ssm deploy-package
