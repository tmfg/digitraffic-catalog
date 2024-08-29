# Mitä pitäisi vielä tehdä?

- Redistä ei ole laitettu kuntoon
- Kohta "8. Set up the DataStore"
-  Extensions are excluded from CSRF protection! We allow extensions to run without CSRF protection but it will be forced future releases. Read the documentation for more information on how to add CSRF protection to your extension.

# Mites kehitys?

1. Kopioi `/ext` kansio `docker/ckan/ckanext` kansioksi. Dockerfile haluaa sisällön tuohon. 
2. Aja `start_local_ckan.sh`
3. Yhdistä [http://localhost:8080/](http://localhost:8080/)
4. Aloita .scss filujen tarkkailu vaikkapa ajamalla `../bundle-css.sh -w`
5. Muokkaa .scss filuja haluamasi mukaan.
6. Refreshaa selain, muutosten pitäisi tulla näkyviin (Hot reload ominaisuutta ei valitettavasti taida olla)