from ckanext.digitraffic_theme.model.mobility_theme import MobilityTheme, MobilityThemeSub, is_valid_mobility_theme_sub


def mobility_theme_sub_validator(key, data, errors, context):
    if data.get(key):
        mobility_theme_sub = MobilityThemeSub(data.get(key))
        mobility_theme = MobilityTheme(data[('mobility_theme',)])
        return is_valid_mobility_theme_sub(mobility_theme, mobility_theme_sub)
    return True
