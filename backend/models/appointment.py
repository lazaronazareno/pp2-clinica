class Appointment():
    def __init__(self, date, id_s, active) -> None:
        self.date = date
        self.id_s = id_s
        self.active = active
        self.id = None

    def set_id(self, id):
        self.id = id

    def add_appointment(self):
        pass

