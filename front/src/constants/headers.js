const DASHBOARD_HEADERS = {
  ADMIN: ["name", "lastname", "phone", "mail", "password", "dni", "date_birth", "is_admin", "is_doctor"],
  TURNOS: ["date", "active", "medical_record_id"],
  INSUMOS: ["name", "stock"],
  ESTUDIOS: ["report","user_id", "department_id"],
  ESPECIALIDADES: ["name"],
};

export default DASHBOARD_HEADERS;
