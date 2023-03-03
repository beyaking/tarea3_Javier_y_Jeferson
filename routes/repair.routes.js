const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllRepairs,
  findOneRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repair.controller');
const { validateStatus } = require('../middlewares/repair.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findAllRepairs);

router.get('/:id', validateStatus, findOneRepair);

router.post(
  '/',
  [
    check('date', 'The user name must mandatory').not().isEmpty(),
    check('motorsNumber', 'The user name must mandatory').not().isEmpty(),
    check('description', 'The user name must mandatory').not().isEmpty(),
    validateFields,
  ],
  createRepair
);

router.patch(
  '/:id',
  [
    check('status', 'The state cannot be empty').not().isEmpty(),

    validateFields,
  ],
  validateStatus,
  updateRepair
);

router.delete('/:id', validateStatus, deleteRepair);

module.exports = {
  repairRouter: router,
};
