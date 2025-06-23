const express = require('express');
const router = express.Router();
const temaController = require('../controllers/temaController');
const auth = require('../middlewares/authMiddleware');

router.get('/', temaController.obtenerTemas);
router.get('/:id', temaController.obtenerTemaPorId);
router.post('/', auth, temaController.crearTema);
router.put('/:id', auth, temaController.editarTema);
router.delete('/:id', auth, temaController.eliminarTema);

module.exports = router;
