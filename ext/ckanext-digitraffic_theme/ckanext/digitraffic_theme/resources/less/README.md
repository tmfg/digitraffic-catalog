# default_less kansio

Tämä kansio siaältää kopion [CKAN:in default less filuista](https://github.com/ckan/ckan/tree/2.9/ckan/public/base/less) sekä CKAN:in käyttämistä Bootstrap filuista

## Tehdyt muutokset alkuperäiseen

- bootstrap.less
  - Muutokset
    - `@bootstrap-path: "./bootstrap_less/";`
  - Muuten ei suostu kääntymään koko filu

# override_less kansio

- main.less
  - Tämä filu itseasiassa käännetään ja viedään extensioniin. Importtaa default_less arvot
- variables.less
  - Tämä filu ylikirjoittaa kaikki ne muuttujat, joita CKAN default toteutus käyttää