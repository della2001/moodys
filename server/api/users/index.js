const express = require('express');
const router = express.Router();

/*
 * 1. Whom we like | N
 * 2. Whom like people in N | N'
 * 3. Who like people in N' | N"
 *
 * N" must be on the top of the list
 *
 * N -> [N1, N2, N3] -> [N1', N2', N3', N4'] -> [N1", N2", N3", N4" ...]
 */

// GET /api/messages
//
// GET /api/users
// -> Users
//
// GET /api/users/me
//
module.exports = (db, isAuthenticated) => {
    const User = require('../../models/user')(db);

    router.use('/me', isAuthenticated, (req, res) => {
        res.json(req.user);
    });

    router.get('/:id', isAuthenticated, (req, res) => {
        const { id } = req.params;

        User.findById(id, '-hashedPassword -salt').then(user => {
            res.json(user);
        });
    });

    router.get('/:id/vote/up', isAuthenticated, (req, res) => {
        const { user, params: { id } } = req;

        if (!user.scores) {
            user.scores = {};
        }

        user.scores[id] = user.scores[id] ? (user.scores[id] + 1) : +1;

        console.log(user);

        user.save().then(res.json({ score: user.scores[id] }));
    });

    router.get('/:id/vote/down', isAuthenticated, (req, res) => {
        const { user, params: { id } } = req;

        if (!user.scores) {
            user.scores = {};
        }

        user.scores[id] = user.scores[id] ? (user.scores[id] - 1) : -1;

        user.save().then(res.json({ score: user.scores[id] }));
    });

    router.get('/', isAuthenticated, (req, res) => {
        const { user } = req;

        const likedUsersIds =
            Object
                .keys(user.scores)
                .filter(id => user.scores[id] > 0);

        User.find({ _id: { $in: likedUsersIds }}).then(likedUsers => {
            const likedUsersPrime =
                likedUsers.reduce((acc, cur) => {
                    if (!cur.scores) {
                        return acc;
                    }

                    const likedUsersIds_ =
                        Object
                            .keys(cur.scores)
                            .filter(id => cur.scores[id] > 0);

                    return [].concat(likedUsersIds_, acc);

                }, []);

            User.find({}).then(users => {
                const usersPrime = users.filter(u => {
                    if (!u.scores) {
                        return false;
                    } else {
                        const found = likedUsersPrime.reduce((acc, cur) => {
                            if (acc) {
                                return true;
                            } else {
                                if (u.scores[cur] && u.scores[cur] > 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        }, false);
                        return found;
                    }
                });
                res.json({
                    users: usersPrime,
                });
            }).catch(e => {
                console.log(e);
            });
        });
    });

    return router;
};

