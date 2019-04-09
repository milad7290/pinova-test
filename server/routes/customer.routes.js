import express from 'express'
import customerCtrl from '../controllers/customer.controller'

const router = express.Router()

router.route('/api/customers/:search')
  .get(customerCtrl.List)
export default router