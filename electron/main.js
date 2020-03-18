const { app, BrowserWindow, Menu } = require('electron')
path =  require("path");
const openAboutWindow = require('about-window').default;

function createWindow () {
  // Cree la fenetre du navigateur.
  let win = new BrowserWindow({
    width: 900,
    height: 800,
    minWidth:500,
    minHeight:800,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  //webPreferences: {
  //  webSecurity: false,
  //  nodeIntegration: true,
  //}

  win.loadFile(path.join(`./dist/index.html`))

  win.on('closed', () => {
    win = null
  })
  
}
app.on('ready', function(){

  createWindow();
  const template = [
    {
      label: 'About',
      click: () =>
           openAboutWindow({
            icon_path: `${__dirname}/logo/logo3.png`,
            homepage: 'https://github.com/messaismael/Pomodoro-Clock',
            description: 'handle your work time',
            copyright: "Copyright © Focus Timer 2020",
            adjust_window_size: true,
            open_devtools: false,
            win_options: {
             modal: false,
             resizable: false,
            },
            show_close_button: 'Close',                    
          }),
    },
    /** {
      label: 'Dev Tools',
      click() {
          // Open the DevTools.
          const currentW = BrowserWindow.getFocusedWindow();
          if (currentW) currentW.webContents.openDevTools();
      }
    }  **/ 
  ]
  const menu = Menu.buildFromTemplate(template);
  app.applicationMenu = menu;
});

app.allowRendererProcessReuse = true
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
