import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import { useState, useContext, useEffect } from "react"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
  
  const [id, setId] = useState(-1)
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')
  const {addFeedback, updateFeedback, feedbackEdit} = useContext(FeedbackContext)

  useEffect(() => {
      if(text === '') {
          setBtnDisabled(true)
          setMessage(null)
      } else if(!(text && text.trim().length >= 10)) {
          setBtnDisabled(true)
          setMessage('Text must be at least 10 characters') 
      } else {
          setBtnDisabled(false)
          setMessage(null)
      }
  }, [text])

  useEffect(() => {
    if(feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setId(feedbackEdit.item.id)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    } 
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const onRatingChange = (newRating) => {
    setRating(newRating)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      if(text && text.trim().length >= 10) {
        if(feedbackEdit.edit) {
          const updatedFeedback = {id, text, rating}
          // console.log('would update Item ', updatedFeedback)
          updateFeedback(updatedFeedback )
        } else {
          const newFeedback = {text, rating}
          addFeedback(newFeedback)
        }
        
        setText('')
        setRating(10)
      }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect emitSelect={(rating) => onRatingChange(rating)}/>
        <div className="input-group">
            <input 
                type="text" 
                placeholder="Write a review" 
                onChange={handleTextChange}
                value={text}
            />
            <Button 
              type='submit'
              isDisabled={btnDisabled}
            >
              {feedbackEdit.edit ? 'Update' : 'Add'}
            </Button>
        </div>
        <p>{message && message}</p>
      </form>
    </Card>
  )
}

export default FeedbackForm