# MirrorMirror <img src="renderer/public/images/logo.png" alt="MirrorMirror logo" width="169">

Powered by Nextron, this app copies files found in one directory to another one; the target directory mirrors the source directory.  This also means that any file in the target directory that is not also in the source directory will be deleted.

To date, the only things MirrorMirror will not mirror are symbolic links.


## Running in dev mode
You can run the app in development mode with `npm run dev`

## Build Configuration
You can build the app with `npm run build`.  To my knowledge, the default behaviour is to output an executable package for the machine used to buid it.

For help with your custom build configuration see the [Nextron Creator's Notes](https://github.com/saltyshiomix/nextron?tab=readme-ov-file#nextron-build-options).

## Automated Testing
You can run the unit tests with `npm run test`