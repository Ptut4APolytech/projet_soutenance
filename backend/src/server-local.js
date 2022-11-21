require("dotenv").config({ path: "./.env.local" });
const app = require("./app");
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`The server is listening on port ${port}`));
