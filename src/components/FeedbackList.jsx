import React from 'react'
// import PropTypes from 'prop-types'
import { useContext } from 'react' 
import FeedbackItem from './FeedbackItem'
import {motion, AnimatePresence} from 'framer-motion'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackList() {

  const {feedback} = useContext(FeedbackContext)

  if(!feedback || feedback.length === 0) {
      return <p><br/><br/>No feedback yet</p>
  }

  return (
    <div className='feedback-list'>
    <AnimatePresence>
    {feedback.map((item, index) => (
      <motion.div 
        key={item.id}
        transition={{ duration: 0.5 }}
        initial={{opactity:0}}
        animate={{opactity: 1}}
        exit={{opactity: 0}}

      >
        <FeedbackItem key={index} item={item}/>
      </motion.div>
    ))}
    </AnimatePresence>
    </div>
  )
  
  /*
  return (
    <div className='feedback-list'>
    {feedback.map((item, index) => (
       <FeedbackItem key={index} item={item} handleDelete={(id) => handleDelete(id)}/>
    ))}
    </div>
  )
  */
}

/*
FeedbackList.propTypes = {
    feedback: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired
        })
    )
}
*/

export default FeedbackList