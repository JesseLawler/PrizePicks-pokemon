This project was built for assessment purposes of Jesse Lawler (that's me!) by the team at PrizePicks.com.

## First Off...

- This was implemented using React-Native, rather than React. (Brenden said that either option was fine.)

# Things That Seem Important

- This project is based on the to-do sheet Front_End_Assessment.pdf in the /assets/pdf directory of this repository.

- Prior to this project I had almost zero knowledge of Pokemon, so I may have made some incorrect guesses as to what Pokemon users want, what an "evolution" is, etc. But I think I've more than covered the basics.

- Most of the additional data (aside from top-level names) is just presented on a pushed screen in raw JSON format, not at all pretty. (Obviously, this is something that could be better done with more time.)

- I did my coding on Android, and I like the general feel on Android better than iOS at the moment. In particular, something about my setup of react-native-vector-icons isn't working on iOS, so I'm using some hacky if/then statements to avoid the use of icons on iOS.

- I haven't tested this on tablet-sized devices, so I recommend handhelds when you review.

- If I'd had a bit more time, I'd have had another button (probably a caret in the upper-right) to hide the Search History panel, in addition to the "hide search history" toggling button that is there now.

- I've locked the app in Portrait mode, just to save development time.

- One thing I discovered when I was too deep in to change course: The react-native-paper interface for TextInput doesn't have a focus() function that can be called on it. This annoyed me, because I really would have liked to auto-focus on the text entry the moment the user enters the app, but no luck there. (I still like react-native-paper as a library, fwiw.)

- I didn't have time to add any automated testing. I put in a trivial jest test just to prove it runs, which you can trigger with...

`````bash
# using npm
yarn jest

- ESLint yields exactly 0 errors, 0 warnings.  Huzzah!  Confirm with...

````bash
# using npm
yarn lint

# Running the App

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions up through "Creating a new application" step, before proceeding.

## Step 1: Start your Application

Open a _new_ terminal from the _root_ of your React Native project.

Run the following commands to start your _Android_ or _iOS_ app:

## Step 2 (Android):

```bash
# using Yarn
yarn
yarn android

## Step 2 (iOS):

```bash
# using Yarn
yarn
cd ios | pod install
cd ..
yarn ios
`````

## Congratulations! :tada:

You've successfully run the app. :partying_face:

### Now what?

- Contact Jesse: (323) 513-8779

# Troubleshooting

If you can't get this to work, send appropriate hate-mail to: business@JesseLawler.com
