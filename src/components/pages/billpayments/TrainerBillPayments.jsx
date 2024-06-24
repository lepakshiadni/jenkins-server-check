import React from 'react'
import Axios from 'axios'

function TrainerBillPayments() {
  const [data, setData] = React.useState(null)

  const submit = async () => {
    if (!data) {
      console.log('No file selected.')
      return
    }

    const formData = new FormData()
    formData.append('file', data)

    try {
      const resp = await Axios.post('http://192.168.1.45:4000/trainer/testProfileApi', formData)
      console.log(resp)
    } catch (error) {
      console.log(error?.message)
    }
  }
  
  return (
    <div>
      <h1 className="text-center">Trainer Bill Payments</h1>
      <input type='file' onChange={(e) => setData(e.target.files[0])} />
      <button onClick={submit}>Submit</button>
    </div>
  )
}

export default TrainerBillPayments
