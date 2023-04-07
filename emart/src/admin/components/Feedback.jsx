import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import LeftColumn from './LeftColumn'
import RightColumn_TopNav from './RightColumn_TopNav'

export default function Feedback() {
  const navigate = useNavigate()

  const { id } = useParams()
  const matchParams = async () => {
    const resultx = await fetch('http://localhost:8000/admin_matchparams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
    const resx = await resultx.json()
    if (resx !== id) {
      navigate(`/wrongparams/${id}`)
    }
  }

  useEffect(() => {
    matchParams()
  }, [])
  return (
    <>
      <div className='admin_panel'>
        {/* left column  */}
        <div className='left_col'>
          <div className='left_fixed'>
            <LeftColumn show='show-5' />
          </div>
        </div>

        {/* Right Column */}
        <div className='right_col'>
          <div className='right_fixed'>
            <section className='topnav'>
              <RightColumn_TopNav link={`/adminpanel/${id}`} />
            </section>
            <div className='error-body'>
              <i className="fa-solid fa-comment"></i>
              This service currently not available
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
