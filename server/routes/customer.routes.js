import express from 'express'
import customerCtrl from '../controllers/customer.controller'

const router = express.Router()

router.route('/api/customers')
  .get(customerCtrl.List)
export default router