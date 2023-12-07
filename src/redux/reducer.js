//action

export const addUser = (user) =>({
    type: 'ADD',
    payload: user
})

export const deleteUser = (id) =>({
    type: 'DELETE',
    payload: id
})

export const updateUser = (id,username, password, role)=>({
    type:'UPDATE',
    payload: {id,username, password, role}
})

//Reducer
const initialState = {
    user: [{
        id:0,
        username: 'phudep Trai',
        password: '123',
        role: [
            {
                abc: 'admin',
                xyz: 'user'
            }
        ]
    }]
}

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case 'ADD':
            const newUser = action.payload;
            return{
                ...state,
                user:[...state.user, newUser]
            }
        
        case 'DELETE':
            const userIdToDelete = action.payload;
            const newUserAfterDelete = state.user.filter(user => user.id !== userIdToDelete);
            return {
                ...state,
                user: newUserAfterDelete,
            }
        default:
            return state
    }
}

export default reducer