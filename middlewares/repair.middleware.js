const Repair = require('../models/repairs.models');
const User = require('../models/users.model');

exports.validateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        status: 'pending',
        id,
      },

      include: [
        {
          model: User
        }
      ]
      
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found',
      });
    }

    req.repair = repair;

    next();
  } catch {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 🧨',
    });
  }
};
