import { createContext, useState } from "react"
const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {

    const [feedback, setFeedback] = useState(
        [1, 2, 3, 4].map(id =>  {
        return {
            id,
            text: `This is feedback item ${id}`,
            rating: Math.floor(Math.random() * 10) + 1
        }})
    )
    
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const addFeedback = (item) => {
        if(feedback.length === 0) {
            item.id = 1
        } else {
            item.id = Math.max(...feedback.map((item) => item.id)) + 1
        }
        setFeedback([item, ...feedback])
    }

    const updateFeedback = (item) => {
        if(item && item.id) {
            setFeedback(feedback.map(it => it.id === item.id ? {...item} :  {...it}))
            setFeedbackEdit(false)
        }
    }

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback, //fn
        feedbackEdit,  // state
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext