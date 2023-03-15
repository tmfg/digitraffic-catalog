Sekalaisia muistiinpanoja
- ckan.ini filu
  - ckan.theme = digitraffic_theme/ckan_base_style
    - digitraffic_theme:ssä on tommonen assetti määritelty
    - Tämä asetetaan CKAN:in main tyyliksi
    - Tuo on luotu default_less kansion less filuista, jotka on käytännössä kopio
      CKAN repon päätyylin less filuista. Kato sen README
  - debug = true
    - Saadaan kätevä debug UI-komponentti

# Tyylit

Jotta saadaan järkevästi muutettua CKAN:in oletustyylejä, kopioidaan CKAN 2.9 version LESS filut ja ylikirjoitetaan siitä muuttujat.
Kuiteskin halutaan tunkata tyylejä käyttäen Sassia. Tämä seuraavien syiden takia
- Fintrafficin DS tarjoaa Sass toteutuksen.
- CKAN 2.10 käyttää Sassia
 