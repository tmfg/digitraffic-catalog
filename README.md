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
 
 # Skriptit

 - `bundle-css.sh`
   - Kasaa kaikki .css filut yhteen
   - Jos menet muuttamaan filua taikka tulee erroria tai muuten vain tuntuu siltä, että nyt on useampi background prosessi päällä koska tapahtuu outoja
     voit tarkastella tilannetta ajamalla
     ```bash
     ps -eF | grep `whoami` | grep bundle-css
     ```
     - Jos löytyy ylimääräisiä prosesseja, tapa ne ajamalla `kill -9 <pid>`

# Kehittäessä tarvittavat plugarit paikallisesti

Jotta IDE:at kykenee hyppimään koodien välillä:

1. mene projektin root kansion alle
2. aja `git clone --depth 1 --branch v1.7.0 https://github.com/ckan/ckanext-dcat.git`
3. mene `ext/ckanext-digitraffic_theme/ckanext` kansion alle
4. aja `ln -s ../../../ckanext-dcat/ckanext/dcat dcat`


# 