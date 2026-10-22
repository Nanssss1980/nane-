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
- Profil avec photo, annuaire avec recherche et filtres
- Réseau (demandes de connexion), notifications, messagerie
- Fil d'actualité : posts avec photo, likes, commentaires, repartages
- Signalement, suppression de profil, charte et règles de la communauté

## Important : les données ne sont pas dans ce dépôt

Le prototype vit dans Claude (artefact). Les profils, posts et messages sont enregistrés
par la base de données de Claude. Si `index.html` est ouvert ailleurs (double clic, GitHub Pages),
la page s'affiche mais reste vide : pas d'annuaire, pas de connexion, pas d'enregistrement.

Pour tester avec de vraies données, utiliser le lien de l'artefact Claude partagé avec le rôle « Contributeur ».

## Publier une modification sur le site en ligne

Modifier `index.html` ici ne change pas le site en ligne. Il faut le republier dans Claude
sur le lien existant, en redéclarant les règles de la base de données :

- `profiles` : lecture « view », écriture « owner »
- `profiles/{self}` : écriture « interact »
- `reports` : lecture « interact », écriture « interact »
- portée utilisateur : « profile »

Ne pas supprimer les appels à `window.claude` : ils connectent le site à sa base de données.

## Pour la vraie version (à construire)

- Base de données et connexion réelles (e-mail ou Google)
- Confirmation d'e-mail et vérification par lien LinkedIn ou site professionnel
- Stockage des photos et vidéos
- Notifications par e-mail ou push
- Outils de modération
- Pages légales : conditions d'utilisation, confidentialité, mentions légales (à valider par un juriste)
- FAQ et formulaire de support

## Nom, logo et domaine

- Nom : NANE (prononcé « nan-e »)
- Domaine envisagé : nanenetwork.com
- À vérifier : marque (TMview, IGE/IPI) et noms de comptes sur les réseaux sociaux
