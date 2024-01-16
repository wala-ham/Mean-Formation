const swaggerJSDoc = require('swagger-jsdoc');

const optionsuser={
  definition : {
    openapi: "3.0.0",
    info : {
      title : "User API",
      version : '1.0.0',
      description : 'Api Documentation for user '
    },
  },
  apis : ['./routes/user.js'],//specifier le path vers les apis correspondants ss
};


const swaggerSpecU = swaggerJSDoc(optionsuser);


module.exports=swaggerSpecU;
