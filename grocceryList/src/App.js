import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
const getLocal = () => {
  let mylist = localStorage.getItem('list')
  if (mylist) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}
function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocal())
  const [isEditting, setIsEditting] = useState(false)
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    msg: '',
  })
  const [editID, setEditID] = useState(null) //which item is being editted

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'danger', 'please enter a value')
    } else if (name && isEditting) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setName('')
      setEditID(null)
      setIsEditting(false)
      showAlert(true, 'success', 'item editted')
    } else {
      showAlert(true, 'success', `the item ${name} has been added to your list`)

      const newitem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newitem])
      setName('')
    }
  }
  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
    // a short cut for setAlert(show:show,type:type,msg:msg)
  }
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item Removed')
    let newList = list.filter((item) => {
      return item.id !== id
    })
    setList(newList)
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditting(true)
    setEditID(id)
    setName(specificItem.title)
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <section className='section-center'>
      <form onSubmit={handleSubmit} className='grocery-form'>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery bub</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='eg. eggs'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <button type='submit' className='submit-btn'>
            {isEditting ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            CLear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
