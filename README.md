This project was built for assessment purposes of Jesse Lawler (that's me!) by the team at https://PrizePicks.com. It's based on _Front_End_Assessment.pdf_ in the /assets/pdf directory of this repository.

## First Off...

- This was implemented using React-Native, rather than React. (Brenden said that either option was fine.)

# Worthy of Mention

- Prior to this project I had near-zero knowledge of Pokemon, so I may have made incorrect guesses as to what Pokemon users want, what an "evolution" is, etc. But I think I've more than covered the basics.

- Beyond the _Home_ screen, additional data is presented in raw JSON format - and not at all pretty.

- I did my coding on _Android_, and I like the app's feel on _Android_ better than _iOS_ at present. In particular, something about my setup of [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) isn't working on _iOS_, so I'm using lame hacks to avoid the use of icons on _iOS_. This definitely would be a top to-fix item if I had more time.

- I've locked the app in Portrait mode.

# Things I Didn't Get To

- I haven't tested this on tablet-sized devices; I recommend handhelds when you review.

- I'd have had another button (probably a caret in the upper-right) to hide the Search History panel, in addition to the "hide search history" toggling button that is there now.

- I haven't given thought to potential concurrency issues, since the app is almost entirely read-only. (I guess certain interface elements such as the _Search History_ could be shared, although why anyone would want that eludes me.)

- One thing I discovered when I was too deep in to change course: The [react-native-paper](https://reactnativepaper.com/) interface for TextInput doesn't have a _focus()_ function that can be called on it. This annoyed me, because I really would have liked to auto-focus on the text entry the moment the user enters the app, but no luck. (I still like the library, fwiw.)

- I didn't add any automated testing. There's a trivial _jest_ test to prove it runs, which you can trigger with:

```bash
yarn jest
```

## You'll Be Happy To Hear...

- ESLint yields exactly 0 errors, 0 warnings. Huzzah! Confirm that with:

```bash
yarn lint
```

# Running the App

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions up through "Creating a new application" step, before proceeding.

> Please also be sure that you have [Android Studio](https://developer.android.com/studio) (which provides you an Android Emulator if you lack a device) and [XCode](https://developer.apple.com/xcode/) (samesies for iOS) installed on your testing machine.

## Get to the right spot.

Open a _new_ terminal from the _root_ of your React Native project.

Run the following commands to start your _Android_ or _iOS_ app:

## For Android:

```bash
yarn
yarn android
```

## For iOS:

```bash
yarn
cd ios
pod install
cd ..
yarn ios
```

_Important Note:_ On _iOS_ (at least with a physical device), the above commands will install the app, but not launch it. You'll see the generic icon for a new app named _PrizePicksDemo_ which you can then click and open normally.

## Congratulations! :tada:

You've successfully run the app. :partying_face:

# Now what?

- Contact Jesse: (323) 513-8779

## Troubleshooting

If you can't get this to work, send appropriate hate-mail to: business@JesseLawler.com
