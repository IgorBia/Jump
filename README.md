# *leap*

Leap is a chromium extension helping with organizing browser tabs and groups on more than one window.  
Currently the extension is avaible on Microsoft Edge and Google Chrome.

## Installation

Download the repository to a folder and load the folder to you browser's extensions.  

1. ```browser://extensions```  
2. ```Load unpacked.```  
3. ```Turn it on.```

## Usage

### Extension pop-up  

After clicking on an extension icon pop-up opens. A user can choose a group to which the tab is to be moved.  
The tab is current active tab and it is moved to the chosen group, to basically "other" window.   
At this point the extension supports two opened windows because the tab is moved to first not-current window but over-two-windows-support is to be developed.

![alt text](https://github.com/IgorBia/leap/blob/README/readMeImages/popup.png?raw=true)

### New tabs automatically in active group.

When new tab is opened, it is moved to previous tab's group so if you are in "Basic" group and you open new tab, it is moved to "Basic" group. In combination with Collapsing groups feature it works amazingly well and everything is on its place. 

<p align="center">
  <img src="https://github.com/IgorBia/leap/blob/README/readMeImages/newTab.png?raw=true" />
</p>

### Collapsing groups

On active tab change, the extension gets the tab's ```groupId``` and collapses every other group so you can clearly see the most important tabs - current used group's tabs.

![alt text](https://github.com/IgorBia/leap/blob/README/readMeImages/screenshot1.png?raw=true)

![alt text](https://github.com/IgorBia/leap/blob/README/readMeImages/screenshot2.png?raw=true)

## Contributing

Pull requests are welcome. For major changes, please open an issue first  
to discuss what you would like to change.  
  
Please make sure to update tests as appropriate.

## License

[MIT](https://en.wikipedia.org/wiki/MIT_License)