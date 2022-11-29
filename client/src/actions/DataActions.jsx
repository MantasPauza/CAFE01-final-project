
function addData(newData) {
    return {
        type: ADD_DATA,
        payload: newData
    }
}

function deleteData(id) {
    return {
        type: DELETE_DATA,
        payload: id
    }
}

function editData(id) {
    return {
        type: EDIT_DATA,
        payload: id
    }
}

// Path: client\src\reducers\dataReducer.jsx

const initialState = {
    data: [
        { id: uuid(), firstName: 'John', lastName: 'Doe', email: '', age: 0 },
    ]
}

function dataAction (state = initialState, action) {
    switch (action.type) {
        case addData:
            return {
                ...state,
                data: [action.payload, ...state.data]
            }
        case deleteData:
            return {
                ...state,
                data: state.data.filter(data => data.id !== action.payload)
            }
        case editData:
            return {
                ...state,
                data: state.data.map(data => data.id === action.payload ? action.payload : data)
            }
        default:
            return state;
    }
}


export { addData, deleteData, editData, dataAction };


