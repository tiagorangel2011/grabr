const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");
const app = express();

app.use(express.static("public"));
app.use(express.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
app.get("/:id/app", function (request, response) {
  response.sendFile(__dirname + "/views/app/dashboard.html");
});
app.get("/new", function (req, res) {
  res.sendFile(__dirname + "/views/app/new.html");
});
app.get("/cdn/script.js", async function (req, res) {
  const ip = (
    req.headers["x-forwarded-for"] || req.connection.remoteAddress
  ).split(",")[0];

  const geo = await (
    await fetch(`https://tools.keycdn.com/geo.json?host=${ip}`, {
      headers: {
        "User-Agent": `keycdn-tools:https://google.com`,
      },
    })
  ).json();

  fs.readFile("./public/script.js", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // Perform the replacements
    const replacements = {
      "%geo%": JSON.stringify(geo.data.geo),
    };

    let modifiedData = data;
    for (const key in replacements) {
      modifiedData = modifiedData.replace(
        new RegExp(key, "g"),
        replacements[key]
      );
    }

    res.setHeader("Content-type", "application/javascript");

    // Send the modified file to the client
    res.send(modifiedData);
  });
});
app.get("/legal/links", function (req, res) {
  res.sendFile(__dirname + "/views/privacy/link.html");
});
app.get("/contact", function (req, res) {
  res.sendFile(__dirname + "/views/app/contact/index.html");
})
app.all("/api/new", async function (req, res) {
  const qjson = require("qjson-db");
  const db = new qjson(".data/db.json");
  const link = req.query.l;

  const id = makeid(9);
  const key = makeid(50);
  db.set(id, {
    key: key,
    link: link,
    hits: [],
  });
  res.send({
    id: id,
    key: key,
  });
});
app.all("/api/exchange", async function (req, res) {
  const qjson = require("qjson-db");
  const db = new qjson(".data/db.json");
  const id = req.query.id;
  const data = req.body;
  var hits = db.get(id).hits;
  hits.push(data);
  db.set(id, {
    link: db.get(id).link,
    hits: hits,
    key: db.get(id).key
  });
  res.send({url: db.get(id).link});
});
app.all("/api/:id", async function (req, res) {
  const qjson = require("qjson-db");
  const db = new qjson(".data/db.json");
  if (db.get(req.params.id).key == req.query.key) {
    res.send(db.get(req.params.id));
  } else {
    res.send({ error: "Invalid auth" });
  }
});
app.get("/:id", function (req, res) {
  fs.readFile("./views/redirect.html", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // Perform the replacements
    const replacements = {
      "%id%": req.params.id,
    };

    let modifiedData = data;
    for (const key in replacements) {
      modifiedData = modifiedData.replace(
        new RegExp(key, "g"),
        replacements[key]
      );
    }

    res.send(modifiedData);
  });
});

function makeid(length) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
