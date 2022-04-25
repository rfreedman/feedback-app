import { useState, useEffect, useContext } from "react"
import FeedbackContext from "../context/FeedbackContext"

function RatingSelect({emitSelect}) {
  const [selected, setSelected] = useState(10)

  const {feedbackEdit} = useContext(FeedbackContext)

  const handleChange = (e) => {
      setSelected(+e.currentTarget.value)
   }

  useEffect(() => {
    emitSelect(selected)
  }, [selected, emitSelect])

  useEffect(() => {
    if(feedbackEdit.edit === true) {
      setSelected(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  return (
    <ul className='rating'>
        {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => 
                <li key={item}>
                    <input
                    type='radio'
                    id={`num${item}`}
                    name='rating'
                    value={item}
                    onChange={handleChange}
                    checked={selected === item}
                    />
                    <label htmlFor={`num${item}`}>{item}</label>
                </li>                
            )
        }
    </ul>
  )
}

export default RatingSelect