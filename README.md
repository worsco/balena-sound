![](https://raw.githubusercontent.com/balena-io-projects/balena-sound/master/images/balenaSound-logo.png)

# Bluetooth, Airplay and Spotify audio streaming for any audio device

**Starter project enabling you to add multi room audio streaming via Bluetooth, Airplay or Spotify Connect to any old speakers or Hi-Fi using just a Raspberry Pi.**

**Features**
- **Bluetooth, Airplay and Spotify Connect support**: Stream audio from your favourite music services or directly from your smartphone/computer using bluetooth.
- **Multi room syncronous playing**: Play perfectly syncronized audio on multiple devices all over your place.

### Hardware required

* Raspberry Pi 3A+/3B/3B+/4B/Zero W
* SD Card (we recommend 8GB Sandisk Extreme Pro)
* Power supply
* 3.5mm audio cable to the input on your speakers/Hi-Fi (usually 3.5mm or RCA)

**Notes** 
- The Raspberry Pi Zero cannot be used on it's own as it has no audio output. To use the Pi Zero you'll need to add something like the [Pimoroni pHAT DAC](https://shop.pimoroni.com/products/phat-dac) to go with it.
- There is a [known issue](https://github.com/raspberrypi/linux/issues/1444) with all variants of the Raspberry Pi 3 where Bluetooth and WiFi interfere with each other. This will only impact the performance of balenaSound if you use a **Pi 3 as the master server to do multi room bluetooth streaming**, resulting in stuttering audio (Airplay and Spotify Connect will work fine, as well as all streaming methods with multi room disabled). In this cases we recommend the use of a Raspberry Pi 4 as the `master` server or a Pi 3 with a bluetooth dongle.

### Software required

* A download of this project (of course)
* Software to flash an SD card ([balenaEtcher](https://balena.io/etcher))
* A free [balenaCloud](https://balena.io/cloud) account
* The [balena CLI tools](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md)

# Setup and use

Running this project is as simple as deploying it to a balenaCloud application; no additional configuration is required (unless you're using a DAC HAT).

### Setup the Raspberry Pi

* Sign up for or login to the [balenaCloud dashboard](https://dashboard.balena-cloud.com)
* Create an application, be sure to select the correct device type for your Raspberry Pi
* Add a device to the application, enabling you to download the OS
* Flash the downloaded OS to your SD card with [balenaEtcher](https://balena.io/etcher)
* Power up the Pi and check it's online in the dashboard

### Deploy this application

* Install the [balena CLI tools](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md)
* Login with `balena login`
* Download this project and from the project directory run `balena push <appName>` where `<appName>` is the name you gave your balenaCloud application in the first step.

# Usage

After the application has pushed and the device has downloaded the latest changes you're ready to go! Before starting, connect the audio output of your Pi to the AUX input on your Hi-Fi or speakers. You can also use the HDMI port to get digitalized audio output.

Here is how to connect to your device:
* If using Bluetooth: search for your device on your phone or laptop and pair.
* If using Airplay: select the balenaSound device from your audio output options.
* If using Spotify Connect: open Spotify and choose the balenaSound device as an alternate output.
* The `balenaSound xxxx` name is used by default, where `xxxx` will be the first 4 characters of the device ID in the balenaCloud dashboard.

If you are running in multi room mode, when you start streaming the device will configure itself as the `master server` and will broadcast a message to all other devices to get them in sync. Note that it can take a few seconds for the system to autoconfigure the first time you stream from a `master server`.

Let the music play!

# Customize your balenaSound experience

You can configure some features of balenaSound by using environment variables. This can be set in the balena dashboard: navigate to dashboard -> your app -> Environment variables. Read more about environment variables [here](https://www.balena.io/docs/learn/manage/serv-vars/#fleet-environment-and-service-variables).

![Setting the device name](images/device-name-config.png)


### Change device name

By default, your device will be named `balenaSound xxxx`. This name will show within Airplay device lists, for Spotify Connect and when searching for devices using Bluetooth.
You can change this using `BLUETOOTH_DEVICE_NAME` environment variable that can be set in balena dashboard.

### Set output volumes

By default, balenaSound will set the output volume of your Raspberry Pi to 100% on the basis you can then control the volume upto the maximum from the connected bluetooth device. If you would like to override this, define the `SYSTEM_OUTPUT_VOLUME` environment variable.

Secondly, balenaSound will play connection/disconnection notification sounds at a volume of 75%. If this unsuitable, you can override this with the `CONNECTION_NOTIFY_VOLUME` environment variable.

**Note:** these variables should be defined as integer values without the `%` symbol.

### Multi room

By default, balenaSound will start in multi room mode. When running in multi room you can stream audio into a fleet of devices and have it play perfectly syncronized, it does not matter wether you have 2 or 100 devices, you only need them to be in the same network.

If you don't want to use multi room or you only have one device, you can disable it by creating the `DISABLE_MULTI_ROOM` variable (with any value, for example: `1`).

**Note:** Multi room requires a network router that supports IP multicast/broadcast (most of modern routers do).

### Set bluetooth PIN code

By default, balenaSound bluetooth will connect using Secure Simple Pairing mode. If you would like to override this and use Legacy Mode with a PIN code you can do it by defining the `BLUETOOTH_PIN_CODE` environment variable. The PIN code must be numeric and up to six digits (1 - 999999).

**Note**: Legacy Mode is no longer allowed on [iOS](https://developer.apple.com/accessories/Accessory-Design-Guidelines.pdf) devices.

### Bluetooth scripts

balenaSound has configurable scripts you can run on connect and disconnect bluetooth events. If you would like to activate this, set the  `BLUETOOTH_SCRIPTS` environment variable to `true`.
Sample scripts can be found on the `./bluetooth-audio/bluetooh-scripts/` directory, theses can be edited as needed.

### Spotify Connect over the internet

Spotify Connect only works with Spotify Premium accounts (due to the use of the [librespot](https://github.com/librespot-org/librespot) library).

If you have a Spotify Premium account you can stream locally without any configuration, but if you want to use Spotify Connect over the internet you will need to provide your Spotify credentials.

To enable Spotify login you can add your username/e-mail and password, which are set with two environment variables: `SPOTIFY_LOGIN` and `SPOTIFY_PASSWORD`.  

---

This project is in active development so if you have any feature requests or issues please submit them here on GitHub. PRs are welcome, too.
