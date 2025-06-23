const express = require('express');
const router = express.Router();
const evaluacionController = require('../controllers/evaluacionController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, evaluacionController.crearEvaluacion);
router.get('/', auth, evaluacionController.obtenerEvaluaciones);
router.put('/:id/status', auth, evaluacionController.actualizarStatus);

module.exports = router;
