import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.calimasolutions.cleancan',
  appName: 'Clean Can',
  webDir: 'www',
  bundledWebRuntime: false,
  loggingBehavior: 'debug',
  server: {
    hostname: 'localhost:4200',
    androidScheme: 'https',
    cleartext: true
  }
};

export default config;
