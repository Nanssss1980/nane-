# NANE

Le réseau professionnel des talents noirs, en France, Allemagne, Suisse, Belgique et Luxembourg.
Langues : français, allemand, anglais.

## Ce que contient ce dépôt

- `index.html` : le prototype complet (une seule page : HTML, CSS et JavaScript).
- `assets/NANE-kit-marque/` : le kit de marque V3 (logos SVG, PNG, PDF, JPEG, icônes, mini-charte).

## Identité visuelle

- Violet profond `#21184B`
- Doré `#C6A15B`
- Ivoire `#F3F0E8`
- Blanc `#FFFFFF`
- Logo : version horizontale V3, intégrée dans `index.html` en SVG (le lettrage est en tracés, aucune police nécessaire).

## Ce que montre le prototype

- Page d'accueil publique, inscription et connexion (maquettes)
- Profil avec photo, projets et portfolio, annuaire avec recherche et filtres
- Réseau (demandes de connexion), notifications, messagerie
- Fil d'actualité : posts avec photo, likes, commentaires, repartages
- Signalement, suppression complète du profil, charte et règles de la communauté
- Menu de langue (FR, DE, EN) dans l'en-tête

## Important : les données ne sont pas dans ce dépôt

Le prototype vit dans Claude (artefact). Les profils, posts et messages sont enregistrés
par la base de données de Claude. Si `index.html` est ouvert ailleurs (double clic, GitHub Pages),
la page s'affiche mais reste vide : pas d'annuaire, pas de connexion, pas d'enregistrement.

Pour tester avec de vraies données, utiliser le lien de l'artefact Claude partagé avec le rôle « Contributeur ».

## Limites connues de cette version de test

- Les messages et les notifications ne sont pas privés au niveau des données. Un avertissement est affiché dans la messagerie. À régler avec un vrai backend.
- L'inscription, la confirmation par e-mail et les badges de vérification sont des maquettes.
- Les images (photos de profil et de posts) sont acceptées uniquement si ce sont de vraies images encodées (`data:image/...;base64`). Tout le reste est ignoré avant l'affichage.
- La messagerie charge les 300 derniers messages de chaque conversation.

## Publier une modification sur le site en ligne

Modifier `index.html` ici ne change pas le site en ligne. Il faut le republier dans Claude
sur le lien existant, en redéclarant les règles de la base de données :

- `profiles` : lecture « view », écriture « owner »
- `profiles/{self}` : écriture « interact »
- `reports` : lecture « interact », écriture « interact »
- portée utilisateur : « profile »

Nouvelle collection `consents` (acceptation des conditions d'utilisation, un document par membre) :
chaque membre doit pouvoir écrire et relire son propre document `consents/{self}`. Les règles exactes restent à définir
lors de la republication.

Ne pas supprimer les appels à `window.claude` : ils connectent le site à sa base de données.
Une seule personne publie à la fois, pour éviter qu'une version écrase l'autre.

## À faire ensuite

- Pages légales : les conditions d'utilisation existent en version de travail (FR, DE, EN). À faire relire par une juriste et à compléter : éditeur, droit applicable. Restent à rédiger : confidentialité complète, mentions légales
- FAQ et formulaire de support
- Catégorie « Opportunités » (mission, emploi, recherche de partenaire) après les premiers retours des testeurs

## Pour la vraie version (à construire)

- Base de données et connexion réelles (e-mail ou Google)
- Messages et notifications réellement privés
- Confirmation d'e-mail et vérification par lien LinkedIn ou site professionnel
- Stockage des photos et vidéos
- Notifications par e-mail ou push
- Outils de modération
- Chatbot d'aide (clé d'API et serveur nécessaires)

## Nom, logo et domaine

- Nom : NANE (prononcé « nan-e »)
- Domaine envisagé : nanenetwork.com
- À vérifier : marque (TMview, IGE/IPI) et noms de comptes sur les réseaux sociaux
