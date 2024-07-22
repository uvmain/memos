/// <reference path="../pb_data/types.d.ts" />

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "test@example.com"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "1234567899"

migrate((db) => {
  const dao = new Dao(db);

  const admin = new Admin();
  admin.email = ADMIN_EMAIL
  admin.setPassword(ADMIN_PASSWORD)

  dao.saveAdmin(admin)
}, (db) => {
  const dao = new Dao(db);

  try {
      const admin = dao.findAdminByEmail(ADMIN_EMAIL)

      dao.deleteAdmin(admin)
  } catch (err) {
    console.error(err)
  }
})