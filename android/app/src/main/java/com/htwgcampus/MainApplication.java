package com.htwgcampus;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.keychain.KeychainPackage;
import com.reactnativenavigation.NavigationApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;


public class MainApplication extends NavigationApplication {


    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            new VectorIconsPackage(),
            new RNI18nPackage(),
            new SplashScreenReactPackage(),
            new KeychainPackage()
        );
    }


    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }
}
