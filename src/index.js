const app = require('./app');
require('./database_mongo')

async function main(){
    await app.listen(app.get('port'));
    console.log('server on port', app.get('port'));
}

main();