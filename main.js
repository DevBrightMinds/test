const { app, BrowserWindow, ipcMain } = require("electron");
const electron = require("electron");
const { request } = require("express");
const RunUpdates = require("./update");
const UpdateMethods = new RunUpdates();
const path = require("path");
const fs = require("fs");
var http = require('http');
var https = require('https');
const childProcess = require("child_process");
const ProgressBar = require('electron-progressbar');

app.on("ready", () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });


    win.loadFile("index.html");

    const uaup = require('uaup-js');
    const defaultStages = {
        Checking: "Checking For Updates!", // When Checking For Updates.
        Found: "Update Found!",  // If an Update is Found.
        NotFound: "No Update Found.", // If an Update is Not Found.
        Downloading: "Downloading...", // When Downloading Update.
        Unzipping: "Installing...", // When Unzipping the Archive into the Application Directory.
        Cleaning: "Finalizing...", // When Removing Temp Directories and Files (ex: update archive and tmp directory).
        Launch: "Launching..." // When Launching the Application.
    };

    const updateOptions = {
        useGithub: true, // {Default is true} [Optional] Only Github is Currenlty Supported.
        gitRepo: "uaup-js", // [Required] Your Repo Name
        gitUsername: "devBrightMinds",  // [Required] Your GitHub Username.
        isGitRepoPrivate: true,  // {Default is false} [Optional] If the Repo is Private or Public  (Currently not Supported).
        gitRepoToken: "059fbce0056312da01d1336118afa56dea5fc015 ",  // {Default is null} [Optional] The Token from GitHub to Access a Private Repo.  Only for Private Repos.

        appName: "update", //[Required] The Name of the app archive and the app folder.
        appExecutableName: "update.exe", //[Required] The Executable of the Application to be Run after updating.

    };

    uaup.Update(updateOptions);
    // let isUpdateAvalible = uaup.CheckForUpdates(updateOptions);
    // if (isUpdateAvalible) {
    //     // Do STUFF HERE
    // }

});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
});
