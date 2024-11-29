import fs from 'node:fs';
import path from 'node:path';
import { app, dialog, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

import FolderDisplay from './FolderDisplay';
import { copy, remove } from './core-logic/mirror';

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('onTargetFolderSelect', async (event, containingFolder) => {
  try {
    let folder: string;

    containingFolder === ''
      ? folder = await dialog.showOpenDialogSync({properties: ['openDirectory', 'multiSelections']})[0]
      : folder = containingFolder;

    let fileDisplay: FolderDisplay[] = [];
    const sourceFolderContents: string[] = fs.readdirSync(folder)
      .map(directoryItem => {
        const itemPath: string = path.join(folder, directoryItem);
        const isFile: boolean = fs.statSync(itemPath).isFile();
        fileDisplay.push({ fileName: directoryItem, isFile: isFile });
  
        return itemPath;
      });
  
    event.reply('onTargetFolderSelect', [folder, sourceFolderContents, fileDisplay]);
  } catch(error) {
    console.error(error);
  }
});

ipcMain.on('onSourceFolderSelect', async (event, containingFolder) => {
  try {
    let folder: string;

    containingFolder === ''
      ? folder = await dialog.showOpenDialogSync({properties: ['openDirectory', 'multiSelections']})[0]
      : folder = containingFolder;

    let fileDisplay: FolderDisplay[] = [];
    const sourceFolderContents: string[] = fs.readdirSync(folder)
      .map(directoryItem => {
        const itemPath: string = path.join(folder, directoryItem);
        const isFile: boolean = fs.statSync(itemPath).isFile();
        fileDisplay.push({ fileName: directoryItem, isFile: isFile });
  
        return itemPath;
      });
  
    event.reply('onSourceFolderSelect', [folder, sourceFolderContents, fileDisplay]);
  } catch(error) {
    console.error(error);
  }
});

ipcMain.on('MirrorTime', async (event, folderObjects) => {
  let isMirrored = false;
  try {
    const {source, target} = folderObjects;

    remove(source?.folderPath, target?.folderContents);
    copy(source?.folderContents, target?.folderPath);
    isMirrored = true;
  } catch(error) {
    console.error(error);
  } finally {
    event.reply('MirrorTime', isMirrored);
  }
});

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})
