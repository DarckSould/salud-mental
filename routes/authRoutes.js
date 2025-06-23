const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout); // 👈 aquí
router.get('/me', auth, (req, res) => {
  res.json({ usuario: req.user.nombre });
});

module.exports = router;
