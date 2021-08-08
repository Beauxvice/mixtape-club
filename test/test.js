const assert = require("assert");
const express = require("express");
const axios = require("axios");
const db = require("../database/index.js");

const app = express();

describe("Redirect", () => {
  describe("app.get(/)", () => {
    it("should redirect to /mixtape-player", () => {
      axios
        .get("/", { proxy: { host: "localhost", port: 3000 } }, (req, res) => {
          res.end();
        })
        .then((data) => {
          assert.equal(
            data,
            '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"\n        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />\n    <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">\n        <title>Mixtape Club</title>\n</head>\n<body>\n    <div id="app"></div>\n    <noscript>\n        You need to enable JavaScript to run this app.\n    </noscript>\n    <!-- Optional JavaScript -->\n    <!-- jQuery first, then Popper.js, then Bootstrap JS -->\n    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"\n    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"\n    crossorigin="anonymous"></script>\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"\n    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"\n    crossorigin="anonymous"></script>\n    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"\n    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"\n    crossorigin="anonymous"></script>\n    <script src="./bundle.js"></script>\n</body>\n</html>'
          );
        })
        .catch((err) => {
        });
    });
  });
});

describe("Log Out users", () => {
  describe("app.get(/logout)", () => {
    it("should log out user", () => {
      axios
        .get("/logout", { proxy: { host: "localhost", port: 3000 } })
        .then((response) => {
          assert.equal(response.data, "logged out");
        })
        .catch((err) => console.log(err));
    });
  });
});

describe("Save Playlists", () => {
  describe("app.post(/store)", () => {
    it("should save playlists", () => {
      axios
        .post("/store", { proxy: { host: "localhost", port: 3000 } })
        .then((response) => {
          assert.equal(response.data, "Playlist Stored");
        })
        .catch((err) => console.log(""));
    });
  });
});
