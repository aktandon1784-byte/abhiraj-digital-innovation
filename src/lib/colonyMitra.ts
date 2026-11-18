/**
 * Colony Mitra (कॉलोनी मित्र) — colony / society management web app.
 *
 * The app itself is a static PWA served from /public/colony-mitra/app.
 * Its backend settings live in /public/colony-mitra/app/config.js.
 */
export const colonyMitra = {
  name: "कॉलोनी मित्र",
  nameEn: "Colony Mitra",
  appUrl: "/colony-mitra/app/index.html",
  demoUrl: "/colony-mitra/demo.html",
  // After building the APK with PWABuilder, upload it as
  // public/colony-mitra/colony-mitra.apk and set this to "/colony-mitra/colony-mitra.apk".
  apkUrl: "",
  plans: [
    { name: "छोटी कॉलोनी", houses: "50 घर तक", price: "₹999", highlight: false },
    { name: "मध्यम कॉलोनी", houses: "51 – 150 घर", price: "₹1,999", highlight: true },
    { name: "बड़ी कॉलोनी", houses: "151 – 300 घर", price: "₹2,999", highlight: false },
  ],
} as const;
