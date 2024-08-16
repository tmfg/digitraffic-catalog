class Distribution:
    accessURL: str
    format: str
    def __init__(self, data):
        self.accessURL = data["url"]
        self.format = data["format"]