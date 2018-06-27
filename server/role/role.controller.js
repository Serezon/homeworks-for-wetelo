const Role = require('./role.model');

/**
 * Load role and append to req.
 */
function load(req, res, next, id) {
  Role.get(id) 
    .then((role) => {
      req.role = role; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get role
 * @returns {Role}
 */
function get(req, res) {
  return res.json(req.role);
}

/**
 * Create new role
 * @returns {Role}
 */
function create(req, res, next) {
  const role = new Role({
    name: req.body.name,
    status: req.body.status,
    isSuperadmin: req.body.isSuperadmin,
    permissions: req.body.permissions
  });
  
  role.save()
    .then(savedRole => res.json(savedRole))
    .catch(e => next(e));
}

/**
 * Update existing role
 * @property {string} req.body.name - The name of role.
 * @property {boolean} req.body.status - The status of role.
 * @property {boolean} req.body.isSuperadmin - The superadm's permissions of role.
 * @property {array} req.body.permissions - The permission of role
 * @returns {Role}
 */
function update(req, res, next) {
  const role = req.role;
  role.name = req.body.name;
  role.status = req.body.status;
  role.isSuperadmin = req.body.isSuperadmin;
  role.permissions = req.body.permissions;

  role.save()
    .then(savedRole => res.json(savedRole))
    .catch(e => next(e));
}

/**
 * Get role list.
 * @property {number} req.body.skip - Number of roles to be skipped.
 * @property {number} req.body.limit - Limit number of roles to be returned.
 * @returns {Role[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.body;
  Role.list({ limit, skip })
    .then(roles => res.json(roles))
    .catch(e => next(e));
}

/**
 * Delete role.
 * @returns {Role}
 */
function remove(req, res, next) {
  const role = req.role;
  role.remove()
    .then(deletedRole => res.json(deletedRole))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
