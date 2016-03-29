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

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbDeviceConnection;
import android.hardware.usb.UsbManager;
import android.os.Binder;
import android.os.Handler;
import android.os.IBinder;
import android.widget.Toast;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

//import usbserial.*;
import com.felhr.usbserial.*;
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

    public static final String ACTION_USB_READY = "com.felhr.connectivityservices.USB_READY";
    private static final String ACTION_USB_PERMISSION = "com.android.example.USB_PERMISSION";
    public static final String ACTION_USB_ATTACHED = "android.hardware.usb.action.USB_DEVICE_ATTACHED";
    public static final String ACTION_USB_DETACHED = "android.hardware.usb.action.USB_DEVICE_DETACHED";
    public static final String ACTION_USB_NOT_SUPPORTED = "com.felhr.usbservice.USB_NOT_SUPPORTED";
    public static final String ACTION_NO_USB = "com.felhr.usbservice.NO_USB";
    public static final String ACTION_USB_PERMISSION_GRANTED = "com.felhr.usbservice.USB_PERMISSION_GRANTED";
    public static final String ACTION_USB_PERMISSION_NOT_GRANTED = "com.felhr.usbservice.USB_PERMISSION_NOT_GRANTED";
    public static final String ACTION_USB_DISCONNECTED = "com.felhr.usbservice.USB_DISCONNECTED";
    public static final String ACTION_CDC_DRIVER_NOT_WORKING ="com.felhr.connectivityservices.ACTION_CDC_DRIVER_NOT_WORKING";
    public static final String ACTION_USB_DEVICE_NOT_WORKING = "com.felhr.connectivityservices.ACTION_USB_DEVICE_NOT_WORKING";

    private static final int BAUD_RATE = 9600; // BaudRate. Change this value if you need
    public static final int MESSAGE_FROM_SERIAL_PORT = 0;

    public static boolean SERVICE_CONNECTED = false;

    private UsbManager usbManager;
    private UsbDevice device;
    private UsbDeviceConnection connection;
    private UsbSerialDevice serialPort;

    private boolean serialPortConnected;

    //private Context context;
    private Handler mHandler;

    private IBinder binder = new UsbBinder();
    //private UsbService usbService;

    public class UsbBinder extends Binder
    {
        public SerialCommunication getService()
        {
            return SerialCommunication.this;
        }
    }

    public SerialCommunication(ComponentContainer container) {
        super(container.$form());
        form.registerForOnResume(this);
        form.registerForOnStop(this);
        portNum = 0;

        /*Transplanted by Ken 20160324*/
        //this.context = this;
        serialPortConnected = false;
        //UsbService.SERVICE_CONNECTED = true;
        //setFilter();
       // usbManager = (UsbManager) getSystemService(Context.USB_SERVICE);
        //findSerialPortDevice();

        // This snippet will open the first usb device connected, excluding usb root hubs
        UsbManager usbManager = (UsbManager) getSystemService(Context.USB_SERVICE);
        UsbDevice device;
        UsbDeviceConnection connection;
        HashMap<String, UsbDevice> usbDevices = usbManager.getDeviceList();
        if(!usbDevices.isEmpty())
        {
            boolean keep = true;
            for(Map.Entry<String, UsbDevice> entry : usbDevices.entrySet())
            {
                device = entry.getValue();
                int deviceVID = device.getVendorId();
                int devicePID = device.getProductId();
                if(deviceVID != 0x1d6b || (devicePID != 0x0001 || devicePID != 0x0002 || devicePID != 0x0003))
                {
                    // We are supposing here there is only one device connected and it is our serial device
                    connection = usbManager.openDevice(device);
                    keep = false;
                }else
                {
                    connection = null;
                    device = null;
                }

                if(!keep)
                    break;
            }
        }

        Toast.makeText(this.form, "try connect", Toast.LENGTH_SHORT).show();
        serialPort = UsbSerialDevice.createUsbSerialDevice(device, connection);
        serialPort.open();
        serialPort.setBaudRate(BAUD_RATE);
        serialPort.setDataBits(UsbSerialInterface.DATA_BITS_8);
        serialPort.setParity(UsbSerialInterface.PARITY_ODD);
        serialPort.setFlowControl(UsbSerialInterface.FLOW_CONTROL_OFF);

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
        serialPort.write("DATA".getBytes());
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

    @Override
    public IBinder onBind(Intent intent)
    {
        return binder;
    }


}
