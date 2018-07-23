import express from 'express';
import {run} from '../../util/run';
import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";
import {check} from 'express-validator/check';

const router = express.Router();

const films = col(cols.FILM);

const saveFilm = doc => films.update({_id: doc._id}, doc, {upsert: true});
const deleteFilm = _id => films.deleteOne({_id});
const getFilm = _id => films.findOne({_id});
const getFilmByName = name => films.findOne({"f.name": name});
const getFilms = () => films.find({}, {_id: 1, "f.name": 1}).toArray();

router.get('/api/films',
    run(getFilms)
);

router.get('/api/film/:_id',
    [
        check("_id")
    ],
    run(({_id}) => getFilm(_id))
);

router.get('/api/filmbyname/:name',
    [
        check("name")
    ],
    run(({name}) => getFilmByName(name))
);

router.delete('/api/film/:_id',
    [
        check("_id")
    ],
    run(({_id}) => deleteFilm(_id))
);

router.post('/api/film',
    [
        check("film")
    ],
    run(({film}) => saveFilm(film))
);

module.exports = router;