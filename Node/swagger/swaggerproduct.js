const swaggerJSDoc = require('swagger-jsdoc');

const optionsproduct = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRUD Node',
      version: '1.0.0',
      description: 'API documentation for your project',
      
    },
  },
  apis: ['./routes/product.js'], // Specify the path to your route files
};

const optionsuser = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRUD Node',
      version: '1.0.0',
      description: 'API documentation for your project',
      
    },
  },
  apis: ['./routes/user.js'], // Specify the path to your route files
};

const swaggerSpecp = swaggerJSDoc(optionsproduct);
const swaggerSpecu = swaggerJSDoc(optionsuser);


module.exports = swaggerSpecp;
module.exports = swaggerSpecu;


// const swaggerJSDoc = require('swagger-jsdoc');

// const optionsproduct={
//   definition : {
//     openapi: "3.0.0",
//     info : {
//       title : "Product API",
//       version : '1.0.0',
//       description : 'Api Documentation for product '
//     },
//   },
//   apis : ['./routes/product.js'],//specifier le path vers les apis correspondants ss
// };


// const swaggerSpecP = swaggerJSDoc(optionsproduct);


// module.exports=swaggerSpecP;




















