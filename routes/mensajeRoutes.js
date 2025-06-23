const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');
const auth = require('../middlewares/authMiddleware');

router.get('/:temaId', mensajeController.obtenerMensajesPorTema);
router.post('/', auth, mensajeController.crearMensaje);
router.put('/:id', auth, mensajeController.editarMensaje);
router.delete('/:id', auth, mensajeController.eliminarMensaje);

module.exports = router;
