class UpdateApp {
    constructor() { }

    checkUpdates = (version) => {
        const newVersion = 2;
        const http = require('https');
        const fs = require('fs');

        if (version < newVersion) {
            const http = require('https');
            const fs = require('fs');

            const url = "https://download.teamviewer.com/full"; // link to file you want to download
            const path = "./updates" // where to save a file

            const request = http.get(url, function (response) {
                if (response.statusCode === 200) {
                    var file = fs.createWriteStream(path);
                    response.pipe(file);
                }
                request.setTimeout(60000, function () { // if after 60s file not downlaoded, we abort a request 
                    request.abort();
                });
            });
        }
    }
}

module.exports = UpdateApp;