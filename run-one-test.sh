#!/bin/bash

clear; /home/andrew/projects/sandboxes/js/cypress-test/node_modules/.bin/cypress run --record --key cd2ec3c5-bb85-4955-8b94-662eb7b5209d --spec "$1"
