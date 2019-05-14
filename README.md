# open-iot-republish
Republish plugin for Open IoT.

This plubin acceps incoming message in any format or serialization and republishes it
wihtout modification on a destination topic defined by the `destinationTopicTemplate` 
argument. The destination can be either static or can contain template tags that are
dynamically substituted with values from the source topic.

# Arguments
The arguments object defined in the integration step is passed as property
of the `context` object. The plugin supports the following arguments:
* `destinationTopicTemplate` (String) (required) - destination topic template. 

  The following template strings are supported:
  * :appId - the application id segment of the source topic
  * :gatewayId - the gateway id segment of the source topic

  Example: `:/appId/:gatewayId/destination/topic`

# How to pack
This package is bundled using the `npm pack` command that produces
a tarball of the package. It is then converted to zip archive using
a convert utiltity script (`utils/convert.sh`)
```fish
npm pack
```

In order to configure what to pack, edit `.npmignore` to exclude unwanted content.
Edit `bundleDependencies` directive in `package.json` to bundle your dependencies in the package.

# How to publish
This package comes with publish utility script that will upload the latest
version of the package to the Open IoT host.
```fish
set -x ACCESS_KEY <access key>
set -x SECRET_KEY <secret key>
set -x IOT_HOST <iot host>
./utils/publish.sh net.vorotnikov.republish-1.0.0.zip $IOT_HOST $ACCESS_KEY $SECRET_KEY
```
