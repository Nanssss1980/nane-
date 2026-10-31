// NANE: connects the app to Firebase (Google sign-in + Firestore).
// The app was written for Claude's window.claude API; this file provides the same API on top of
// Firebase, so index.html keeps calling window.claude.use("user") and window.claude.use("db").
// Access is invite-only: a signed-in person must have a document invites/{their email}.
(function () {
  "use strict";
  var config = window.NANE_FIREBASE_CONFIG;
  window.naneAuth = { configured: !!config, user: null, notInvited: null };
  if (!config || typeof firebase === "undefined") return; // index.html then shows its "not configured" state

  firebase.initializeApp(config);
  var auth = firebase.auth();
  var db = firebase.firestore();

  // Resolves once Firebase knows whether someone is signed in.
  var firstAuthState = new Promise(function (resolve) {
    var off = auth.onAuthStateChanged(function (u) { off(); resolve(u); });
  });

  // Signed in, verified email, and on the invite list.
  var member = firstAuthState.then(function (u) {
    if (!u) return null;
    if (!u.emailVerified || !u.email) { window.naneAuth.notInvited = u.email || "?"; return null; }
    return db.collection("invites").doc(u.email.toLowerCase()).get().then(function (snap) {
      if (!snap.exists) { window.naneAuth.notInvited = u.email; return null; }
      return db.collection("admins").doc(u.uid).get().then(function (a) { return { user: u, isAdmin: a.exists }; },
        function () { return { user: u, isAdmin: false }; });
    }, function () { window.naneAuth.notInvited = u.email; return null; });
  });

  window.naneAuth.signIn = function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return auth.signInWithPopup(provider);
  };
  window.naneAuth.signOut = function () { return auth.signOut(); };
  window.naneAuth.firstAuthState = firstAuthState;

  window.claude = {
    use: function (ns) {
      return member.then(function (m) {
        window.naneAuth.user = m ? m.user : null;
        if (!m) return null;
        if (ns === "db") return db;
        if (ns === "user") {
          return {
            isAdmin: m.isAdmin,
            me: function () { return Promise.resolve({ name: m.user.displayName || "", avatarUrl: m.user.photoURL || "" }); },
            id: function () { return Promise.resolve(m.user.uid); },
            can: function () { return Promise.resolve(true); }
          };
        }
        return null;
      });
    }
  };
})();
