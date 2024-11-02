const DASHBOARD_HEADERS = {
  ADMIN: ["name", "email", "dni", "date_birth", "is_admin", "is_doctor"],
  TURNOS: ["date", "active", "status", "medical_record_id"],
  INSUMOS: ["name", "stock"],
  ESTUDIOS: ["report","user_id", "department_id"],
  ESPECIALIDADES: ["name"],
};

export default DASHBOARD_HEADERS;
