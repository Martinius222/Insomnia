const {app, BrowserWindow } = require('electron')
const { powerSaveBlocker } = require('electron')
  
function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  
  // Load the index.html of the app.
  win.loadFile('src/index.html')
  
}
  
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// This method is equivalent to 'app.on('ready', function())'
app.on("ready", () => {
  createWindow();
  powerSaveBlocker.start("prevent-display-sleep");

})
  
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
  
app.on('activate', () => {
    // On macOS it's common to re-create a window in the 
    // app when the dock icon is clicked and there are no 
    // other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
