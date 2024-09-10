# Kehittäessä tarvittavat plugarit paikallisesti

Jotta IDE:at kykenee hyppimään koodien välillä:

1. mene projektin root kansion alle
2. aja `git clone --depth 1 --branch v1.7.0 https://github.com/ckan/ckanext-dcat.git`
3. mene `ext/ckanext-digitraffic_theme/ckanext` kansion alle
4. aja `ln -s ../../../ckanext-dcat/ckanext/dcat dcat`