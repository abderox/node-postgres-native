const express = require("express");
const cors = require("cors");
const init = require("./api/init");
const plantsRoutes = require("./api/routes");


const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// sql.once('open', async() => {
//     console.log("Postgres database connection established successfully");
// })

(async () => {
    await init();
})();
 



app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});



app.use("/api/plants", plantsRoutes);




const PORT = 4850;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});