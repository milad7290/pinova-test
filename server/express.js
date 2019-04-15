import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
import customerRoutes from './routes/customer.routes'
import productRoutes from './routes/product.routes'
import invoiceRoutes from './routes/invoice.routes'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import StaticRouter from 'react-router-dom/StaticRouter'

import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import { blueGrey, lightGreen } from '@material-ui/core/colors'

import devBundle from './devBundle'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

devBundle.compile(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use('/', customerRoutes)
app.use('/', productRoutes)
app.use('/', invoiceRoutes)

app.get('*', (req, res) => {
   const sheetsRegistry = new SheetsRegistry()
   const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
      fontFamily: '"IranSans"',
    },
     direction: 'rtl',
     palette: {
       primary: {
       light: '#8eacbb',
       main: '#3f51b5',
       dark: '#34515e',
       contrastText: '#fff',
     },
     secondary: {
       light: '#e7ff8c',
       main: '#b2ff59',
       dark: '#7ecb20',
       contrastText: '#000',
     },
       openTitle: blueGrey['400'],
       protectedTitle: lightGreen['400'],
       type: 'light'
     }
   })
   const generateClassName = createGenerateClassName()
   const context = {}
   const markup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
         <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
              <MainRouter/>
            </MuiThemeProvider>
         </JssProvider>
      </StaticRouter>
     )
    if (context.url) {
      return res.redirect(303, context.url)
    }
    const css = sheetsRegistry.toString()
    res.status(200).send(Template({
      markup: markup,
      css: css
    }))
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }
})

export default app
