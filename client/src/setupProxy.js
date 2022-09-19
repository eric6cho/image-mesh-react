const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    '/image-mesh/api',
    createProxyMiddleware({
      target: 'https://image-mesh-server.herokuapp.com' ,
      changeOrigin: true,
    })
  );
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8888',
      changeOrigin: true,
    })
  );

}
