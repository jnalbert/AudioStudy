const app = require("express")();
import {Request, Response, NextFunction} from "express"
const morgan = require("morgan");
const cors = require("cors");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");


//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(errorhandler());
app.use(bodyParser.json());

const PORT = 4000


app.post('/enroll-account', (req: Request, res: Response, next: NextFunction) => {
  
})

app.listen(PORT, () => {
  console.log('The server is listening on port ' + PORT);
})