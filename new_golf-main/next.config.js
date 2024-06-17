/** @type {import('next').NextConfig} */
const path = require('path');
 const nextConfig = {
   sassOptions: {
     includePaths: [path.join(__dirname, 'styles')],
   },
   images: {
    unoptimized: true
  },
   output:'export',
   basePath:'/golf/2023',

   trailingSlash: true,
  // async rewrites(){
  //   [
  //     {
  //       source:'/submit/:form',
  //       destination:'/submit.html?form=:form'
  //     },
  //     {
  //       source:'/submit/team',
  //       destination:'/submit/team.html'
  //     }
  //   ]
  //  }
 }

module.exports = nextConfig
