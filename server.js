require('./src/services/environment');
const app = require('./src/app');

const port = process.env.PORT || 80;

app.listen(port, () => console.log(`Listening on port ${port}`));