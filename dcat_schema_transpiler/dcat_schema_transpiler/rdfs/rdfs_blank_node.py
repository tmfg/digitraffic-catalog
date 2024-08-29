from rdfs.resource import Resource


class BlankNode(Resource):
    def __init__(self):
        self.values = []
        self.skolem_iri = ""

    def value(self):
        self.values