# NANE

The professional network for Black talent in France, Germany, Switzerland, Belgium and Luxembourg.
Languages: English (default), French, German.

This is the stand-alone version of the NANE prototype (originally a Claude artifact). It runs on
GitHub Pages, with Google Firebase for sign-in and the database.

## Files

- `index.html`: the whole app (HTML, CSS and JavaScript on one page).
- `backend.js`: connects the app to Firebase. It provides the same `window.claude` API the
  prototype used, so the app code stays the same.
- `firebase-config.js`: the Firebase project settings (to fill in, see below).
- `firestore.rules`: who can read and write what. Enforced by Firebase on the server.
- `firestore.indexes.json`, `firebase.json`: database index and deploy settings.
- `assets/NANE-kit-marque/`: brand kit (logos, icons, mini style guide).

## Access: invite-only

Until the legal notice is ready and a lawyer has reviewed the terms, NANE is invite-only:
only people whose email is in the `invites` collection can see or do anything.
To open it to everyone later, change `isMember()` in `firestore.rules` to `return signedIn();`.

## Setting up Firebase (once)

1. Go to https://console.firebase.google.com and create a project (for example `nane`).
   Google Analytics is not needed: leave it off.
2. **Database**: Build > Firestore Database > Create database.
   Location: `europe-west3 (Frankfurt)`, so data stays in the EU. Start in **production mode**.
3. **Sign-in**: Build > Authentication > Get started > Google > Enable. Choose a support email.
4. **Allowed sites**: Authentication > Settings > Authorized domains > Add domain:
   `nelladelva.github.io`
5. **Web app settings**: Project settings (gear icon) > General > Your apps > Web (`</>`).
   Register the app (no Firebase Hosting needed), then copy the `firebaseConfig` object
   into `firebase-config.js`:
   ```js
   window.NANE_FIREBASE_CONFIG = { apiKey: "…", authDomain: "…", projectId: "…", … };
   ```
   These values are public by design. The protection comes from `firestore.rules`.
6. **Rules and index**: Firestore Database > Rules: paste the content of `firestore.rules`, then Publish.
   Firestore Database > Indexes > Composite > Add index: collection `messages`,
   field `participantIds` = Arrays, field `lastMessageAt` = Descending, scope Collection.
   (Or with the command line: `npx firebase-tools login`, then
   `npx firebase-tools deploy --only firestore --project <project-id>`.)

## Inviting people

Firestore Database > Data > Start collection `invites` (first time), then for each person
add a document whose **Document ID is their email in lowercase** (for example `ada@example.com`),
with one field `invited` = `true`. They sign in with the Google account of that email.

## Admins (founders' dashboard)

After an admin has signed in once, find their **User UID** in Authentication > Users.
Add a document with that UID as Document ID in the `admins` collection (field `admin` = `true`).
Admins see the dashboard, can read reports, remove content and grant badges.
Admins cannot read private messages.

## Publishing changes

The site is served by GitHub Pages from the `main` branch: pushing to `main` updates it
within a minute or two. Changes to `firestore.rules` must also be published in the Firebase console.

## Before opening to the public

- Legal notice (Impressum): name, postal address and email of whoever runs NANE.
- Lawyer review of the terms of use and completion of the two placeholders
  (operator, applicable law), plus a full privacy policy that names Google Firebase and GitHub.
- A legal structure (association or company) and liability insurance for the founders.

## Known limits

- Photos are stored inside the database documents (up to about 400 KB each).
- The directory loads the 300 newest profiles, the feed the 100 newest posts.
- No email notifications yet.
