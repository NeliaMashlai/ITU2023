# ITU

Garage sale web application.

## Installation options

### Docker

#### Backend

```bash
cd backend
docker build --pull --rm -f "Dockerfile" -t backend:latest .
```

#### Frontend

```bash
cd frontend
docker build --pull --rm -f "Dockerfile" -t frontend:latest .
```

### Manual installation

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Frontend

```bash
cd frontend
python -m venv venv
source venv/bin/activate
npm install
```

## Usage

### Docker

#### Backend

```bash
docker run --rm -d -p 8080:8080/tcp backend:latest
```

#### Frontend

```bash
docker run --rm -d -p 3000:3000/tcp frontend:latest
```

### Manual run

#### Backend

```bash
cd backend
source venv/bin/activate
python run.py
```

#### Frontend

```bash
cd frontend
source venv/bin/activate
npm build
npm install -g serve
serve -s build
```

## Frontend debugging

```bash
cd frontend
npm run start
```

## Prerequisites

<!-- links -->

[python]: https://www.python.org/downloads/
[python-venv]: https://docs.python.org/3/library/venv.html
[python-pip]: https://pypi.org/project/pip/
[nodejs]: https://nodejs.org/en/download/
[npm]: https://www.npmjs.com/get-npm
[git]: https://git-scm.com/downloads
[docker]: https://docs.docker.com/get-docker/

<!-- links end -->

- [Python][python] >= 3.9
- [Python venv][python-venv]
- [Python pip][python-pip]
- [Node.js][nodejs] >= 14.17.0
- [npm][npm] >= 6.14.13
- [Git][git]
- [Docker][docker] (optional)

## Authors

- [**Mashlai Neonila - xmashl00**](https://github.com/NeliaMashlai)
- [**Maksym Podhornyi - xpodho08**](https://github.com/max0n1x)

## License

This project is licensed under the GNU GPL v3 License - see the [LICENSE](LICENSE) file for details.

## Used components and its licenses

<!-- links -->

[react]: https://reactjs.org/
[react-license]: https://mit-license.org/
[react-router-dom]: https://reactrouter.com/web/guides/quick-start
[react-router-dom-license]: https://mit-license.org/
[python-fastapi]: https://fastapi.tiangolo.com/
[python-fastapi-license]: https://mit-license.org/
[sqlite]: https://www.sqlite.org/index.html
[sqlite-license]: https://www.sqlite.org/copyright.html
[docker]: https://www.docker.com/
[docker-license]: https://github.com/moby/moby/blob/master/LICENSE

<!-- links end -->

- [React][react] - [MIT License][react-license]
- [React Router DOM][react-router-dom] - [MIT License][react-router-dom-license]
- [Python FastAPI][python-fastapi] - [MIT License][python-fastapi-license]
- [SQLite][sqlite] - [Public Domain][sqlite-license]
- [Docker][docker] - [Apache License 2.0][docker-license]





