package com.google.appinventor.components.runtime;

import java.util.HashMap;
import java.util.Map;

import com.google.appinventor.components.annotations.DesignerComponent;
import com.google.appinventor.components.annotations.DesignerProperty;
import com.google.appinventor.components.annotations.PropertyCategory;
import com.google.appinventor.components.annotations.SimpleEvent;
import com.google.appinventor.components.annotations.SimpleFunction;
import com.google.appinventor.components.annotations.SimpleObject;
import com.google.appinventor.components.annotations.SimpleProperty;
import com.google.appinventor.components.annotations.UsesLibraries;
import com.google.appinventor.components.annotations.UsesPermissions;
import com.google.appinventor.components.common.ComponentCategory;
import com.google.appinventor.components.common.PropertyTypeConstants;
import com.google.appinventor.components.common.YaVersion;
import com.google.appinventor.components.runtime.util.ErrorMessages;

import com.google.appinventor.components.common.UsbService;

//import android.app.Service;
//import android.content.Context;
//import android.content.Intent;
//import android.hardware.Sensor;
//import android.hardware.SensorEvent;
//import android.hardware.SensorEventListener;
//import android.hardware.SensorManager;
//import android.hardware.usb.UsbDevice;
//import android.hardware.usb.UsbDeviceConnection;
//import android.hardware.usb.UsbManager;
//import android.os.Binder;
//import android.os.Handler;
//import android.os.IBinder;
//import android.widget.Toast;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

//import usbserial.*;
//import com.felhr.usbserial.*;
//import com.felhr.usbserial.UsbSerialDevice;
//import com.felhr.usbserial.UsbSerialInterface;

@UsesLibraries(libraries = "usbserial.jar")
@DesignerComponent(version = YaVersion.SERIALCOMMUNICATION_COMPONENT_VERSION,
        category = ComponentCategory.CONNECTIVITY,
        description = "This is a test of serial communication in AI2.",
        nonVisible = true,
        iconName = "images/usb.png"
)

@UsesPermissions(permissionNames =
        "android.permission.WRITE_EXTERNAL_STORAGE,"+ "android.permission.READ_EXTERNAL_STORAGE"
)

/**
 * Created by Kening on 2016-03-02.
 */
@SimpleObject
public class SerialCommunication extends AndroidNonvisibleComponent
        implements Component,OnStopListener, OnResumeListener //, Deleteable
{



    private int portNum;

    /*transplanted by Ken 20160324*/


    private UsbService usbService;

    public SerialCommunication(ComponentContainer container) {
        super(container.$form());
        form.registerForOnResume(this);
        form.registerForOnStop(this);
        portNum = 0;

        /*Transplanted by Ken 20160324*/
        //this.context = this;


    }

    @SimpleProperty(
            category = PropertyCategory.APPEARANCE,
            description = "This is a test by Ken."
    )
    public int getPortNum() {
        return portNum;
    }



    @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,defaultValue = "1")

//    @SimpleProperty(
//            category = PropertyCategory.BEHAVIOR,
//            description = "This is a test by Ken."
//    )
    /*
    20160321
     */
    @SimpleFunction(description = "Set com port")
    public void setPortNum(int num){
        portNum = num;
        // set port

    }

    //start communication
    //end communication

    @SimpleFunction(description = "Send")
    public void sendData(int data){

    }

    @SimpleFunction(description = "Read")
    public int readData(){
        return 0;
    }

    // OnResumeListener implementation

    @Override
    public void onResume() {

    }

    // OnStopListener implementation

    @Override
    public void onStop() {

    }




}
