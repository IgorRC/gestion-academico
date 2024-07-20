const {app} = require('./src/app')

const port = 8081

if(require.main === module)
    app.listen(port,() => console.log(`listening on port ${port}`))

module.exports.app = app
