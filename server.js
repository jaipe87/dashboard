require('dotenv').config();
const app = require('./src/app'); // Fijate que importa desde /src
const port =  process.env.PORT || 3001;


app.listen(port,'0.0.0.0', () => {
    console.log(`App corriendo en el puerto ${port}`);
});
