# Tenley

## Development Environment

### Requirements

1. [Node](https://nodejs.org/en/)
2. [React Native](http://facebook.github.io/react-native/docs/getting-started.html)
3. [Yarn](https://yarnpkg.com/en/docs/install)
4. (Optional) [NVM](https://github.com/creationix/nvm)
5. (Optional) [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
6. (Optional) [React Native Tools](https://github.com/Microsoft/vscode-react-native)

### Setup

1. Clone the repo.
2. Install the requirements (for React Native follow the instructions to set-up xCode and Android Studio)
3. Install the dependencies by executing `yarn`

#### iOS

- Install CocoaPods run `sudo gem install cocoapods`.
- Then install the pods, go to the iOS folder and run `pod install`.
- On a new tab, run `yarn start --reset-cache` to start the Metro Bundler.
- If installing the app for the first time (or it your change requires a full build), run `yarn run ios`.

#### Android

- On a new tab, run `yarn start --reset-cache` to start the Metro Bundler.
- If installing the app for the first time (or it your change requires a full build), run `yarn run android`.

#### Extras

- If you want debugging, download the react native debugger app and enable debugging in the [In-App Developer Menu](https://facebook.github.io/react-native/docs/debugging.html#accessing-the-in-app-developer-menu).
