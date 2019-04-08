export default ({markup, css}) => {
    return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>MERN PINOVA TEST</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <style>
              a{
                text-decoration: none
              }
              @font-face{
                font-family: "IranSans";
                src: url(dist/fonts/iran-sans/IRANSansWeb.eot);
                src: url(dist/fonts/iran-sans/IRANSansWeb.eot?#iefix) format("embedded-opentype"),
                url(dist/fonts/iran-sans/IRANSansWeb.woff) format("woff"),
                url(dist/fonts/iran-sans/IRANSansWeb.woff2) format("woff2"),
                url(dist/fonts/iran-sans/IRANSansWeb.ttf) format("truetype");
              }
              body {
                font-family: "IranSans";
              }
          </style>
        </head>
        <body dir="rtl" style="margin:0">
          <div id="root">${markup}</div>
          <style id="jss-server-side">${css}</style>
          <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
          <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>`
}
