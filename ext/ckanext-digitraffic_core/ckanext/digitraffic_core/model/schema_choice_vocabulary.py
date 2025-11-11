from ckanext.digitraffic_core.model.schema_vocabulary import SchemaVocabulary

class SchemaChoiceVocabulary(SchemaVocabulary):

    def __init__(self, iri: str):
        super().__init__(iri)
        self.choice = self._get_choice(iri)

    def _get_choice(self, iri: str):
        choices_filtered = [choice for choice in self.__class__._get_field()['choices'] if choice.get('iri', choice['value']) == iri]
        if len(choices_filtered) == 1:
            return choices_filtered[0]
        raise ValueError(f"IRI {iri} is not a valid choice in the vocabulary {self.__class__.__name__}")

    @classmethod
    def get_iris(cls):
        return {choice.get('iri', choice['value']) for choice in cls._get_field()['choices']}

    @property
    def labels(self):
        return self.choice['label']

