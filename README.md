# hku-noodle
A prototype wrapper of HKU Moodle created with React Native Expo

## Prerequisites
A JS package manager is required. Yarn is recommended, install with homebrew:
```shell
brew install yarn
```
Then install `expo-cli` as needed to run or build the app:
```shell
yarn global add expo-cli
```

## Run or build the app
### Run the app
At project root, run the following command to start the bundler:
```shell
yarn start
```
You can choose to run the app in a configured VM or your own devices. Note that to run the app on your device you need to have the Expo app installed.

### Build the app
At project root, run the following command:
```shell
expo build:${platform}
```
Replace `${platform}` with `android`, `ios`, etc.
