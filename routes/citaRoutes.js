const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, citaController.agendarCita);
router.get('/mis-citas', auth, citaController.obtenerMisCitas);

module.exports = router;
