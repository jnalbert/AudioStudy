import 'dotenv/config';

export default {
  expo: {
    name: "Audio Study",
    slug: "audiostudy",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/AppLogoSquare.png",
    splash: {
     image: "./assets/FullLogo.png",
      resizeMode: "contain",
      backgroundColor: "#fffffffe"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: false
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID
      }
  }
}
