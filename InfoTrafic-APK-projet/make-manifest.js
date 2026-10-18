// Génère twa-manifest.json à partir de URL.txt
const fs = require("fs");
let url = fs.readFileSync("URL.txt", "utf8").trim();
if (!/^https:\/\/[^/\s]+/.test(url) || /METS-ICI/.test(url)) {
  console.error("❌ URL.txt doit contenir le lien HTTPS de l'application mobile (ex. https://monsite.vercel.app/)");
  process.exit(1);
}
if (!url.endsWith("/")) url += "/";
const host = new URL(url).host;
const m = {
  packageId: "ma.adm.infotrafic",
  host,
  name: "Info Trafic ADM",
  launcherName: "Info Trafic",
  display: "standalone",
  orientation: "portrait",
  themeColor: "#0f2a4a",
  themeColorDark: "#0f2a4a",
  navigationColor: "#0f2a4a",
  navigationColorDark: "#0f2a4a",
  navigationDividerColor: "#0f2a4a",
  navigationDividerColorDark: "#0f2a4a",
  backgroundColor: "#0f2a4a",
  enableNotifications: true,
  startUrl: url.replace(/^https:\/\/[^/]+/, "") || "/",
  iconUrl: url + "icon-512.png",
  maskableIconUrl: url + "icon-maskable-512.png",
  splashScreenFadeOutDuration: 300,
  signingKey: { path: "./android.keystore", alias: "infotrafic" },
  appVersionName: "1.0.0",
  appVersion: "1",
  shortcuts: [],
  generatorApp: "bubblewrap-cli",
  webManifestUrl: url + "manifest.webmanifest",
  fallbackType: "customtabs",
  features: {},
  alphaDependencies: { enabled: false },
  enableSiteSettingsShortcut: true,
  isChromeOSOnly: false,
  isMetaQuest: false,
  fullScopeUrl: url,
  minSdkVersion: 21,
  additionalTrustedOrigins: [],
  retainedBundles: [],
};
fs.writeFileSync("twa-manifest.json", JSON.stringify(m, null, 2));
console.log("✅ twa-manifest.json créé pour", url);
