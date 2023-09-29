## Description
This solution manages rental and sales for an event dress rental business.
This prototype manages, monitors and reports important data for the business, such as customers, products, sales and invoices.

More than a solution, this repository seeks to show my skills using python and django from the backend and javascript and vue from the frontend.

As part of the solution I documented, I added coverage of unit and integration tests on the backend and frontend side, design patterns, easy-to-maintain and readable code, always thinking that the solution is a quality product following good software development practices.

## Development tools used
* Python 3
* Django 4
* Vue 3
    * Axios
    * Router
    * Pinia
    * Jest
* Vite 4
* Bootstrap 5

## Project Setup

## Set enviroment to Django app
These steps should help get you started developing with Python 3 and Django 4.

## Install python 3 in Ubuntu env:
```sh
sudo apt install python3
```

## Install dependences

```sh
pip install -r requirements.txt
```
## Run migrations:

```sh
python3 manage.py makemigrations
python3 manage.py migrate
```

## Generate fake data via console (you can also use the user interface where you will find options for creating data defined by default.):

```sh
python3 manage.py create_fake_data [numbers_of_records]
```

## To delete fake data via console:

```sh
python3 manage.py delete_fake_data
```

## Run server:

```sh
python3 manage.py runserver
```

## Run test from Django app:

```sh
python3 manage.py test
```

## Set enviroment to Vue 3 and Vite app
These steps should help get you started developing with Vue 3 in Vite.

## From frontend directory to install package.json dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Run test from Vue app:

```sh
npm run test
```

