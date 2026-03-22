import { connection } from '../db.js';

export const getAllUsers = (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
};



// Buscar usuario por email
export const getUserByEmail = (req, res) => {
  const { email } = req.params;

  connection.query(
    'SELECT * FROM usuarios WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json(results);
    }
  );
};

// Buscar usuario por nombre (LIKE)
export const getBuscarNombre = (req, res) => {
  const { nombre } = req.params;

  const buscar = `%${nombre}%`;

  connection.query(
    'SELECT * FROM usuarios WHERE nombre LIKE ?',
    [buscar],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json(results);
    }
  );
};



// Crear usuario
export const postCrearUsuario = (req, res) => {
  const { nombre, documento, carnet, email, contrasenia } = req.body;

  const query = `
    INSERT INTO usuarios 
    (nombre, documento, carnet, email, contrasenia, bloqueado, ultimo_login, activo)
    VALUES (?, ?, ?, ?, ?, 'N', NULL, 'A')
  `;

  connection.query(
    query,
    [nombre, documento, carnet, email, contrasenia],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // MySQL devuelve insertId
      res.json({
        message: 'Usuario creado',
        id: result.insertId
      });
    }
  );
};

// ================================
// Actualizar usuario
// ================================
export const actualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, documento, carnet, email, contrasenia } = req.body;

  const query = `
    UPDATE usuarios
    SET nombre = ?,
        documento = ?,
        carnet = ?,
        email = ?,
        contrasenia = ?
    WHERE id_usuario = ?
  `;

  connection.query(
    query,
    [nombre, documento, carnet, email, contrasenia, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Si no se actualizó nada
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json({ message: 'Usuario actualizado' });
    }
  );
};

// ===============================================
// Eliminar usuario
// ===============================================
export const eliminarUsuario = (req, res) => {
  const { id } = req.params;

  // Primero verificamos si existe
  connection.query(
    'SELECT * FROM usuarios WHERE id_usuario = ?',
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Si existe, eliminamos
      connection.query(
        'DELETE FROM usuarios WHERE id_usuario = ?',
        [id],
        (err2, result) => {
          if (err2) {
            return res.status(500).json({ error: err2.message });
          }

          res.json({
            message: 'Usuario eliminado correctamente',
            usuario: results[0]
          });
        }
      );
    }
  );
};