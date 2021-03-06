module.exports = (state = {
  chatRooms: []
}, action) => {
  switch (action.type) {

    case 'ADD_ROOM':
      let rooms = state.chatRooms
      for (let i = 0; i < state.chatRooms.length; i++) {
        if (rooms[i].friend === action.payload.friend && rooms[i].user === action.payload.user) {
          return state
        }
      }
      state = Object.assign({}, state, {
        chatRooms: [...state.chatRooms, action.payload]
      })
      return state

    case 'CLOSE_ROOM':
      let remainingRooms = [...state.chatRooms].filter((room) => {
        if (room.friend === action.payload.friend && room.user === action.payload.user) {
          return false
        }
        return true
      })

      state = Object.assign({}, state, {
        chatRooms: remainingRooms
      })
      return state

    default:
      return state
  }
}