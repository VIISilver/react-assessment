import axios from 'axios';

// INITIAL STATE
const initialState = {
    tasks: [{}],
    user: '',
    task: [{
        id: 24,
        title: "New Task",
        description: "",
        completed: true
    }],
    taskId: '',
    taskObject: {
        title: ''
    },
    deleted: ''
}
// CONSTANTS THAT REPRESENT ACTIONS
const FULFILLED = '_FULFILLED';
const GET_ALL_TASKS = 'GET_ALL_TASKS';
const ADD_TASK = 'ADD_TASK';
const RESET_WIZARD = 'RESET_WIZARD';
const DELETE_TASK = 'DELETE_TASK';
const MARK_COMPLETED = 'MARK_COMPLETED';
const GET_TASK = 'GET_TASK';

// ACTION CREATORS
export function getAllTasks() {
    console.log('Get All Tasks fired')
    const allTasks = axios.get('https://practiceapi.devmountain.com/api/tasks')
        .then(res => {
            return res.data;
        })
    return {
        type: GET_ALL_TASKS,
        payload: allTasks
    }
}

export function addTask(obj) {
    console.log('Add Task fired')
    const promise = axios.post('https://practiceapi.devmountain.com/api/tasks', obj).then(response => {
        return response.data;
    });

    return {
        type: ADD_TASK,
        payload: promise
    }
}

export function deleteTask(id) {
    console.log('Delete Task fired')
    const deleteTask = axios.delete('https://practiceapi.devmountain.com/api/tasks/' + id)
        .then(res => {
            return res.data
        })
    return {
        type: DELETE_TASK,
        payload: deleteTask
    }
}

export function markCompleted(id) {
    console.log('Mark Completed fired')
    const markComplete = axios.put('https://practiceapi.devmountain.com/api/tasks/' + id)
        .then(res => {
            return res.data
        })
    return {
        type: MARK_COMPLETED,
        payload: markComplete
    }
}

export function getTask(index) {
    const task = axios.get('https://practiceapi.devmountain.com/api/tasks')
        .then(res => {
            return [res.data[index]];
        })
    return {
        type: GET_TASK,
        payload: task
    }
}

export function resetWizard() {
    return {
        type: RESET_WIZARD,
        payload: null
    }
}

// REDUCER FUNCTION
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TASKS + FULFILLED:
            return Object.assign({}, state, { tasks: action.payload });

        case ADD_TASK + FULFILLED:
            return Object.assign({}, state, { tasks: action.payload });

        case RESET_WIZARD: {
            let newState = Object.assign({}, state);
            for (let j in newState.taskObject) {
                newState.taskObject[j] = null;
            }
            return newState;
        }

        case DELETE_TASK + FULFILLED:
            return Object.assign({}, state, { tasks: action.payload })

        case MARK_COMPLETED + FULFILLED:
            return Object.assign({}, state, { tasks: action.payload })

        case GET_TASK + FULFILLED: {
            return Object.assign({}, state, { task: action.payload })
        }

        default: return state;
    }
}