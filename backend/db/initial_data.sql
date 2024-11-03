INSERT INTO clinic.user (id, dni, name, lastname, password, is_admin, is_doctor, mail, phone, date_birth) VALUES
(1, 30123456, 'Juan', 'Perez', 'test123', 1, 0, 'admin@clinica.com', '1134567890', '1978-02-25'),
(2, 28345678, 'Ana', 'Gomez', 'test123', 0, 1, 'ana.gomez@clinica.com', '1123456789', '1985-04-17'),
(3, 26347891, 'Maria', 'Rodriguez', 'test123', 0, 0, 'maria.rodriguez@correo.com', '1145678901', '1992-09-10'),
(4, 27564321, 'Carlos', 'Lopez', 'test123', 0, 1, 'carlos.lopez@clinica.com', '1156789012', '1975-12-12'),
(5, 29678432, 'Lucia', 'Fernandez', 'test123', 0, 0, 'lucia.fernandez@correo.com', '1167890123', '1988-07-05');
(6, 31234567, 'Pedro', 'Martinez', 'test123', 1, 0, 'pedro.martinez@clinica.com', '1178901234', '1980-03-15'),
(7, 32345678, 'Laura', 'Diaz', 'test123', 1, 0, 'laura.diaz@clinica.com', '1189012345', '1982-06-20'),
(8, 33456789, 'Jorge', 'Ramirez', 'test123', 1, 0, 'jorge.ramirez@clinica.com', '1190123456', '1979-11-30'),
(9, 34567890, 'Sofia', 'Mendez', 'test123', 1, 0, 'sofia.mendez@clinica.com', '1101234567', '1983-09-25'),
(10, 35678901, 'Diego', 'Sanchez', 'test123', 0, 1, 'diego.sanchez@clinica.com', '1112345678', '1987-01-10'),
(11, 36789012, 'Valeria', 'Castro', 'test123', 0, 1, 'valeria.castro@clinica.com', '1123456789', '1990-05-22'),
(12, 37890123, 'Martin', 'Gonzalez', 'test123', 0, 1, 'martin.gonzalez@clinica.com', '1134567890', '1984-08-14'),
(13, 38901234, 'Carolina', 'Ruiz', 'test123', 0, 1, 'carolina.ruiz@clinica.com', '1145678901', '1986-12-05'),
(14, 39012345, 'Pablo', 'Hernandez', 'test123', 0, 0, 'pablo.hernandez@correo.com', '1156789012', '1991-03-18'),
(15, 40123456, 'Marta', 'Lopez', 'test123', 0, 0, 'marta.lopez@correo.com', '1167890123', '1989-07-29'),
(16, 41234567, 'Luis', 'Garcia', 'test123', 0, 0, 'luis.garcia@correo.com', '1178901234', '1993-10-11'),
(17, 42345678, 'Elena', 'Torres', 'test123', 0, 0, 'elena.torres@correo.com', '1189012345', '1992-02-07'),
(18, 43456789, 'Ricardo', 'Vega', 'test123', 1, 1, 'ricardo.vega@clinica.com', '1190123456', '1981-04-23'),
(19, 44567890, 'Natalia', 'Morales', 'test123', 1, 1, 'natalia.morales@clinica.com', '1101234567', '1985-09-12'),
(20, 45678901, 'Fernando', 'Ortiz', 'test123', 1, 1, 'fernando.ortiz@clinica.com', '1112345678', '1983-11-19'),
(21, 46789012, 'Gabriela', 'Silva', 'test123', 1, 1, 'gabriela.silva@clinica.com', '1123456789', '1987-06-30');

INSERT INTO clinic.supply (id, name, stock) VALUES
(1, 'Jeringas', 120),
(2, 'Gasas esteriles', 250),
(3, 'Guantes de latex', 300),
(4, 'Termometros digitales', 60),
(5, 'Algodon', 200),
(6, 'Alcohol en gel', 150),
(7, 'Barbijos', 100),
(8, 'Vendas', 180),
(9, 'Tijeras', 50),
(10, 'Desinfectante', 80);

INSERT INTO clinic.department (id, name) VALUES
(1, 'Cardiologia'),
(2, 'Neurologia'),
(3, 'Ortopedia'),
(4, 'Pediatria'),
(5, 'Dermatologia'),
(6, 'Ginecologia'),
(7, 'Oftalmologia'),
(8, 'Psiquiatria'),
(9, 'Urologia'),
(10, 'Oncologia');

INSERT INTO clinic.medical_record (id, created_at, report, department_id, user_id) VALUES
(1, '2023-01-10', 'Informe de control de presion arterial', 1, 1),
(2, '2023-02-20', 'Chequeo postoperatorio de cirugia cardiaca', 1, 2),
(3, '2023-03-15', 'Evaluacion de funcion cognitiva', 2, 3),
(4, '2023-04-25', 'Consulta por fractura de clavicula', 3, 4),
(5, '2023-05-10', 'Consulta por dermatitis', 5, 5),
(6, '2023-06-15', 'Control de embarazo', 6, 6),
(7, '2023-07-20', 'Examen de la vista', 7, 7),
(8, '2023-08-25', 'Evaluacion psiquiatrica', 8, 8),
(9, '2023-09-30', 'Chequeo de prostata', 9, 9),
(10, '2023-10-05', 'Tratamiento de quimioterapia', 10, 10);

INSERT INTO clinic.appointment (id, date, active, medical_record_id) VALUES
(1, '2023-05-10', 1, 1),
(2, '2023-06-05', 0, 2),
(3, '2023-07-15', 1, 3),
(4, '2023-08-01', 0, 4),
(5, '2023-09-10', 1, 5),
(6, '2023-10-15', 0, 6),
(7, '2023-11-20', 1, 7),
(8, '2023-12-25', 0, 8),
(9, '2024-01-30', 1, 9),
(10, '2024-02-05', 0, 10);
