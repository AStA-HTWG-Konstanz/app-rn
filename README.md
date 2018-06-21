<h1 align="center">
  <img src="./android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png"/><br>
  HTWG Campus
</h1>


### Build Status
| Platform        | Status
| :-------------: |:-------------:|
| iOS | [![Build Status](https://www.bitrise.io/app/5b25008a467b84d6/status.svg?token=6FZURaNjsCmi0B_Ob__kHQ&branch=development)](https://www.bitrise.io/app/5b25008a467b84d6) |
| Android | [![Build Status](https://www.bitrise.io/app/b2be1d3084b125ce/status.svg?token=9ouF8_DIyVRZqdskwkZoww&branch=development)](https://www.bitrise.io/app/b2be1d3084b125ce)      |


### How to run
```console
foo@bar:~$ git clone https://github.com/AStA-HTWG-Konstanz/app.git && cd app
foo@bar:~$ yarn install
foo@bar:~$ react-native run-ios
```

### How to contribute
- Create or take an issue
- Create a feature branch with a correct name for the waffle bot: [issue number]-[your_branch_name]
- Pull request + assign [inf2381](https://github.com/inf2381) as reviewer

### Structure
**src/** is the main folder of this app. All the JavaScript code could be found in here.

**src/actions** + **src/reducers** + **src/store**: Redux-related code goes in here. [Redux in a nutshell](https://medium.com/@allen.chinazor/redux-in-a-nutshell-1f96fb9b1fd) is a good entry point if you are not familiar with redux.

**src/backend_connection**: Data logic is maintained in this directory. This includes REST calls to the backend, local storage (PouchDB) and keychain access for persisting credentials.

**src/config**: Constants that are used across the app like the color scheme.

**src/i18n**: Internalization files.

**src/modules**: UI related code like app screens, reusable components, etc.

**src/App.js**: Entry point to the app. Combines everything and starts the navigation.

**src/NavigationRegistry.js**: Components for [react-native-navigation](https://github.com/wix/react-native-navigation) are registered here (app screens + custom navigation buttons).

**src/package.json**: Just a hack to be able to import files like this way *src/modules/SelectList*