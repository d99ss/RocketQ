const Database = require("../db/config");


module.exports = {
    async create(req, res) {
        const db = await Database();
        const pass = req.body.password;
        let roomId;
        let isRoom;

        while (isRoom) {
            /* Gera numero da Sala */
            for (var i = 0; i < 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                    roomId += Math.floor(Math.random() * 10).toString();
            }

            /* Verifica se o numero ja existe */
            const roomsExistIds = await db.all(`SELECT id FROM rooms`);
            isRoom = roomsExistIds.some(roomsExistId => roomsExistId === roomId);
            if (!isRoom) {
                /* Inseri a sala no Banco */
                await db.run(`INSERT INTO rooms (
                 id,
                 pass
               ) VALUES (
                 ${parseInt(roomId)},
                 ${pass}
                )`);
            }
        }

        await db.close();

        res.redirect(`/room/${roomId}`);
    },

    open(req, res) {
        const roomId = req.params.room;
        res.render("room", { roomId: roomId });
    }
};