#!/bin/bash

# assumes that any dna yaml files
# over in happ/workdir
# are already pre-compiled and up to date
# In CI this is handled via .github/workflows/release.yml
# where it calls install-hc-tools and and happ-pack

# ensure all necessary binaries are packaged in the app
rm -rf electron/binaries
mkdir electron/binaries
# copy any dna files into the electron/binaries folder for distribution
cp REA/*.dna electron/binaries
# copy a primary happ file into the electron/binaries folder for distribution
cp REA/hrea_suite.happ electron/binaries
bash scripts/copy-binaries.sh

# ui
rm -rf electron/web
npm run web-build
cp -r $1 electron/web

# build the electron application
cd electron
npm run build

