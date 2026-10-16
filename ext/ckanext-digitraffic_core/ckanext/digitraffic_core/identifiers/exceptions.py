"""Rejections of organisation identifiers; each subclass names the rule that failed."""


class InvalidIdentifier(ValueError):
    """A value that is not a valid organisation identifier; the message is meant for the user."""


class IdentifierMismatch(InvalidIdentifier):
    """Identifiers that contradict each other: a Finnish EUID of another company than the Y-tunnus."""


class MissingIdentifier(InvalidIdentifier):
    """An organisation without a Y-tunnus, an EUID or an EUDI."""


class IdentifierChangeNotAllowed(InvalidIdentifier):
    """A submission that would set or change an identifier where only the stored one may be kept."""


class InvalidFinnishEuid(InvalidIdentifier):
    """An EUID of the Finnish trade register whose registration number is not a valid Y-tunnus in the stored form."""
