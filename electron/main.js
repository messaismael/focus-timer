const { app, BrowserWindow, Menu, webContents, shell } = require( 'electron' )
var path = require( "path" );
const openAboutWindow = require( 'about-window' ).default;

function createWindow() {

  let win = new BrowserWindow( {
    width: 900,
    height: 800,
    minWidth: 500,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: true,
    }
  } )

  const handleRedirect = ( e, url ) => {
    if ( url !== e.sender.getURL() ) {
      e.preventDefault()
      shell.openExternal( url )
    }
  }

  win.webContents.on( 'will-navigate', handleRedirect )

  win.loadFile( path.join( 'dist', 'index.html' ) )

  win.on( 'closed', () => {
    win = null
  } )
}


app.on( 'ready', function () {

  createWindow();
  const template = [
    {
      label: 'About',
      click: () =>
        openAboutWindow( {
          icon_path: `${__dirname}/build/abouticon.png`,
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
        } ),
    },
    /** 
    {
      label: 'Dev Tools',
      click() {
        // Open the DevTools.
        const currentW = BrowserWindow.getFocusedWindow();
        if ( currentW ) currentW.webContents.openDevTools();
      }
    }
    */
  ]
  const menu = Menu.buildFromTemplate( template );
  app.applicationMenu = menu;
} );

app.allowRendererProcessReuse = true

app.on( 'window-all-closed', () => {
  if ( process.platform !== 'darwin' ) {
    app.quit()
  }
} )



