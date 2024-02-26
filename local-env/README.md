Tämä docker compose on asennettu [CKAN 2.9](https://docs.ckan.org/_/downloads/en/2.9/pdf/#section.3.1) version asennus ohjeita (otsikko 3.1.2 Installing CKAN from source) mukaillen.

# Miksi ei vain käytetä CKAN:in tarjoamia kontteja?

Koska niiden repoissa ei ole mitään lisenssiä, joten en uskaltanut

# Mitä eroavaisuuksia ohjeisiin?

- Käytetään Rockylinuxia, joka on CentOS:in epävirallinen seuraaja. Entuudestaan tässä projektissa on jo RHEL pohjaset käyttikset tuttuja, niin tuo tuntuisi olevan hyvä käyttis
- Asennetaan CKAN, Possu ja Solr omiin kontteihinsa sen sijaan, että kaikki olisi samassa, niin on vähän nätimmän näköistä
- Tehdään CKAN:ille oma käyttäjä sen sijaan, että roottina menis
- CKAN-schema piti käydä hakemassa gitin historian syövereistä sen sijasta, että käytettäisiin suoraan annettua URL:ia, kun se hakee uusimman version
- CKAN-schema Solr:ille asennuspaikka muuttunut ohjeista
- ckan.ini asetukset
  - ckan.devserver.host = 0.0.0.0
    - Koska ajetaan ckania kontissa
  - sqlalchemy.url ja solr_url ei käytetä localhostia, koska ajetaan docker composella

# Mitä pitäisi vielä tehdä?

- Redistä ei ole laitettu kuntoon
- Kohta "8. Set up the DataStore"

# Mites kehitys?

1. Aja `start_local_ckan.sh`
2. Yhdistä [http://localhost:5001/](http://localhost:5001/) (Mac on varannut portin 5000, siksi 5001)
3. Aloita .scss filujen tarkkailu vaikkapa ajamalla `../bundle-css.sh -w`
4. Muokkaa .scss filuja haluamasi mukaan.
5. Refreshaa selain, muutosten pitäisi tulla näkyviin (Hot reload ominaisuutta ei valitettavasti taida olla)