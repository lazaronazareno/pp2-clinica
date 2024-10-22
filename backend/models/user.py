class UserBase():
    def __init__(self, dni, name, lastname, is_admin, is_internal, date, mail) -> None:
        self.dni = dni
        self.name = name
        self.lastname = lastname
        self.is_admin = is_admin
        self.is_internal = is_internal
        self.date = date
        self.mail = mail
        self.tel = None
        self.id = None

    def set_tel(self, tel):
        self.tel = tel

    def set_id(self, id):
        self.id = id

    def add_user(self):
        pass

    