package com.htwgcampus;

import com.facebook.react.ReactActivity;
import com.reactnativenavigation.controllers.SplashActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;

public class MainActivity extends SplashActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
   /* @Override
    protected String getMainComponentName() {
        return "htwgCampus";
    }*/
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, R.style.SplashTheme);
        super.onCreate(savedInstanceState);
    }
}
