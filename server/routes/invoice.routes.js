import express from 'express'
import invoiceCtrl from '../controllers/invoice.controller'

const router = express.Router()

router.route('/api/invoices')
  .get(invoiceCtrl.List)

  router.route('/api/invoices/getNextInvoiceNumber')
  .get(invoiceCtrl.getNextInvoiceNumber)

  router.route('/api/invoices/iranStates')
  .get(invoiceCtrl.iranStates)

  router.route('/api/invoices/by/:from/:to/:page/:offset')
  .get(invoiceCtrl.ListWithFilter)

router.route('/api/invoices')
  .post(invoiceCtrl.create)
  .get(invoiceCtrl.List)


export default router
