# ⚡ PowerPulse: Android Native & Capacitor Mobile Bridge Code

> **Course:** PROG 212 - Android and Web Application Development Sessional  
> **Project:** PowerPulse – Smart Electricity Outage Intelligence & Real-Time Field Dispatch  
> **Lead Presenter:** **Tarikul (ID: 30)** – *Mobile Application Engineer*  

**Total Source Code Files in this Document:** 6 files  

---

## 📑 Table of Contents & Module Guide

- `01.` **[web/capacitor.config.json](#file-1)** – *Capacitor Native Mobile Bridge Config*
- `02.` **[web/android/app/src/main/AndroidManifest.xml](#file-2)** – *Android Application Manifest & Permissions*
- `03.` **[web/android/app/src/main/java/com/powerpulse/app/MainActivity.java](#file-3)** – *Capacitor Native Java Activity Bridge*
- `04.` **[web/android/app/build.gradle](#file-4)** – *build.gradle*
- `05.` **[web/android/build.gradle](#file-5)** – *build.gradle*
- `06.` **[web/android/settings.gradle](#file-6)** – *settings.gradle*

---

## <a id="file-1"></a>[01] `web/capacitor.config.json`

### 📌 Capacitor Native Mobile Bridge Config
- **ফাইল পাথ:** `Power-Pulse-main/web/capacitor.config.json`  
- **প্রোগ্রামিং ভাষা:** `json` | **মোট লাইন:** `17` লাইন  

> **💡 এই ফাইলটির কাজ কী (বাংলা ব্যাখ্যা):**  
> এই ফাইলটি ওয়েব প্রজেক্টটিকে একটি ফুল-ফাংশনাল অ্যান্ড্রয়েড অ্যাপে রূপান্তর করে।  

> **⚙️ মূল লজিক ও ফাংশনসমূহ:**  
> • appId: com.powerpulse.app
> • appName: PowerPulse
> • webDir: dist
> • bundledWebRuntime: false  

> **🗣️ প্রেজেন্টেশন / ভাইভায় স্যারকে যা বলবে:**  
> "This is the Capacitor manifest linking our compiled web app to the native Android OS, establishing the application package ID and runtime bridge."  

```json
{
  "appId": "com.powerpulse.app",
  "appName": "PowerPulse",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "cleartext": true,
    "androidScheme": "http"
  },
  "plugins": {
    "LocalNotifications": {
      "smallIcon": "ic_launcher_foreground",
      "iconColor": "#0284c7"
    }
  }
}
```

---

## <a id="file-2"></a>[02] `web/android/app/src/main/AndroidManifest.xml`

### 📌 Android Application Manifest & Permissions
- **ফাইল পাথ:** `Power-Pulse-main/web/android/app/src/main/AndroidManifest.xml`  
- **প্রোগ্রামিং ভাষা:** `xml` | **মোট লাইন:** `48` লাইন  

> **💡 এই ফাইলটির কাজ কী (বাংলা ব্যাখ্যা):**  
> অ্যান্ড্রয়েড ওএস-এর অনুমতি ফাইল। জিপিএস লোকেশন ও ক্যামেরা ব্যবহারের পারমিশন এখানে ঘোষণা করা হয়েছে।  

> **⚙️ মূল লজিক ও ফাংশনসমূহ:**  
> • Uses-permission: ACCESS_FINE_LOCATION, CAMERA, VIBRATE, INTERNET.
> • MainActivity config: Screen orientation & hardware acceleration.  

> **🗣️ প্রেজেন্টেশন / ভাইভায় স্যারকে যা বলবে:**  
> "AndroidManifest declares the necessary Android OS permissions, including fine location telemetry and native camera access for physical hazard proofs."  

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:usesCleartextTraffic="true"
        android:theme="@style/AppTheme">

        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode|navigation|density"
            android:name=".MainActivity"
            android:label="@string/title_activity_main"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

        </activity>

        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths"></meta-data>
        </provider>
    </application>

    <!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-feature android:name="android.hardware.location.gps" android:required="false" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />
</manifest>
```

---

## <a id="file-3"></a>[03] `web/android/app/src/main/java/com/powerpulse/app/MainActivity.java`

### 📌 Capacitor Native Java Activity Bridge
- **ফাইল পাথ:** `Power-Pulse-main/web/android/app/src/main/java/com/powerpulse/app/MainActivity.java`  
- **প্রোগ্রামিং ভাষা:** `java` | **মোট লাইন:** `6` লাইন  

> **💡 এই ফাইলটির কাজ কী (বাংলা ব্যাখ্যা):**  
> অ্যান্ড্রয়েড অ্যাপের প্রধান জাভা ফাইল। এটি ক্যাপাসিটর ওয়েবহোস্ট চালু করে এবং ওয়েব কোডের সাথে মোবাইলের হার্ডওয়্যার কানেক্ট করে।  

> **⚙️ মূল লজিক ও ফাংশনসমূহ:**  
> • Extends BridgeActivity: ক্যাপাসিটরের নেটিভ প্লাগইন ম্যানেজার রান করে।  

> **🗣️ প্রেজেন্টেশন / ভাইভায় স্যারকে যা বলবে:**  
> "MainActivity.java is our native Android entry point. Extending BridgeActivity, it initializes the WebView and bridges device hardware directly to React."  

```java
package com.powerpulse.app;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {}
```

---

## <a id="file-4"></a>[04] `web/android/app/build.gradle`

### 📌 Source Module: build.gradle
- **ফাইল পাথ:** `Power-Pulse-main/web/android/app/build.gradle`  
- **প্রোগ্রামিং ভাষা:** `groovy` | **মোট লাইন:** `55` লাইন  

> **💡 এই ফাইলটির কাজ কী (বাংলা ব্যাখ্যা):**  
> প্রজেক্টের একটি অপরিহার্য সোর্স কোড ফাইল।  

> **⚙️ মূল লজিক ও ফাংশনসমূহ:**  
> • Functional component / module logic.  

> **🗣️ প্রেজেন্টেশন / ভাইভায় স্যারকে যা বলবে:**  
> "This file is an integral component of the PowerPulse architecture."  

```groovy
apply plugin: 'com.android.application'

android {
    namespace = "com.powerpulse.app"
    compileSdk = rootProject.ext.compileSdkVersion
    defaultConfig {
        applicationId "com.powerpulse.app"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        aaptOptions {
             // Files and dirs to omit from the packaged assets dir, modified to accommodate modern web apps.
             // Default: https://android.googlesource.com/platform/frameworks/base/+/282e181b58cf72b6ca770dc7ca5f91f135444502/tools/aapt/AaptAssets.cpp#61
            ignoreAssetsPattern = '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~'
        }
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

repositories {
    flatDir{
        dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
    }
}

dependencies {
    implementation fileTree(include: ['*.jar'], dir: 'libs')
    implementation "androidx.appcompat:appcompat:$androidxAppCompatVersion"
    implementation "androidx.coordinatorlayout:coordinatorlayout:$androidxCoordinatorLayoutVersion"
    implementation "androidx.core:core-splashscreen:$coreSplashScreenVersion"
    implementation project(':capacitor-android')
    testImplementation "junit:junit:$junitVersion"
    androidTestImplementation "androidx.test.ext:junit:$androidxJunitVersion"
    androidTestImplementation "androidx.test.espresso:espresso-core:$androidxEspressoCoreVersion"
    implementation project(':capacitor-cordova-android-plugins')
}

apply from: 'capacitor.build.gradle'

try {
    def servicesJSON = file('google-services.json')
    if (servicesJSON.text) {
        apply plugin: 'com.google.gms.google-services'
    }
} catch(Exception e) {
    logger.info("google-services.json not found, google-services plugin not applied. Push Notifications won't work")
}
```

---

## <a id="file-5"></a>[05] `web/android/build.gradle`

### 📌 Source Module: build.gradle
- **ফাইল পাথ:** `Power-Pulse-main/web/android/build.gradle`  
- **প্রোগ্রামিং ভাষা:** `groovy` | **মোট লাইন:** `30` লাইন  

> **💡 এই ফাইলটির কাজ কী (বাংলা ব্যাখ্যা):**  
> প্রজেক্টের একটি অপরিহার্য সোর্স কোড ফাইল।  

> **⚙️ মূল লজিক ও ফাংশনসমূহ:**  
> • Functional component / module logic.  

> **🗣️ প্রেজেন্টেশন / ভাইভায় স্যারকে যা বলবে:**  
> "This file is an integral component of the PowerPulse architecture."  

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.13.0'
        classpath 'com.google.gms:google-services:4.4.4'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

apply from: "variables.gradle"

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

---

## <a id="file-6"></a>[06] `web/android/settings.gradle`

### 📌 Source Module: settings.gradle
- **ফাইল পাথ:** `Power-Pulse-main/web/android/settings.gradle`  
- **প্রোগ্রামিং ভাষা:** `groovy` | **মোট লাইন:** `5` লাইন  

> **💡 এই ফাইলটির কাজ কী (বাংলা ব্যাখ্যা):**  
> প্রজেক্টের একটি অপরিহার্য সোর্স কোড ফাইল।  

> **⚙️ মূল লজিক ও ফাংশনসমূহ:**  
> • Functional component / module logic.  

> **🗣️ প্রেজেন্টেশন / ভাইভায় স্যারকে যা বলবে:**  
> "This file is an integral component of the PowerPulse architecture."  

```groovy
include ':app'
include ':capacitor-cordova-android-plugins'
project(':capacitor-cordova-android-plugins').projectDir = new File('./capacitor-cordova-android-plugins/')

apply from: 'capacitor.settings.gradle'
```

---

