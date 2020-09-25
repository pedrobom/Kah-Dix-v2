const RoomPlayer = require('../models/RoomPlayer')

module.exports = {

    async createRoomPlayerAsync(data) {
        try {

            const roomPlayer = await RoomPlayer.create({
                hand: data
            })
            console.log(JSON.parse(JSON.stringify(roomPlayer.hand)))

        } catch (ex) {
            console.log("Error: ", ex.message)
        }
    }
}