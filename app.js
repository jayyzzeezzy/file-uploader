// import Node dependencies
require("dotenv").config();



const app = express();



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));