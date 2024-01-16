const express = require('express')
const productRoute= require('./routes/product');
const userRoute= require('./routes/user');

const swaggerUi = require('swagger-ui-express');
const swaggerSpecP = require('./swagger/swaggerproduct');
//const swaggerSpecU = require('./swagger/swaggeruser')


require('./config/connect');
const app= express();
app.use(express.json());

/*SWAGGER INTEGRATION */
app.use('/productswg', swaggerUi.serve, swaggerUi.setup(swaggerSpecP));
//app.use('/userswagg', swaggerUi.serve, swaggerUi.setup(swaggerSpecU));


app.use('/product', productRoute);
app.use('/user', userRoute);


app.listen(3000, ()=>{
console.log('server working on port 3000');
});


