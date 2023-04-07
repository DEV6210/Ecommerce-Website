import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import Chart from './Chart'
import LeftColumn from './components/LeftColumn'
import LeftOptions from './components/LeftOptions'
import RightColumn_TopNav from './components/RightColumn_TopNav'
import './css/admin_panel.css'
import './css/uploadform.css'
import { apiurl } from '../services/api'

export default function Admin_panel() {


  const navigate = useNavigate()

  const { id } = useParams()
  const matchParams = async () => {
    const resultx = await fetch(`${apiurl}/admin_matchparams`, {
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

  const [productData, setProductData] = useState({
    pname: '',
    pdesc: '',
    catagory: '',
    pprice: '',
    pdiscount: '',
    inr_off: '',
    seles_price: '',
    pimage: ''
  })

  const inputData = (e) => {
    // console.log(e.target.name, e.target.value);
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }
  const fileData = (e) => {
    // console.log(e.target.files[0])
    setProductData({ ...productData, pimage: e.target.files[0] })
  }
  var cost = productData.pprice
  var discount = productData.pdiscount

  var off = discount / 100
  var inr_off = Math.round(cost * off)
  var seles_off = Math.round(cost - inr_off)

  var inroff = '₹' + inr_off
  var seles = '₹' + seles_off


  if (productData.pdiscount > 100) {
    alert('Please Enter Discount  0 to 100 %')
  }
  if (productData.pdiscount && productData.pprice) {
    document.getElementById('cal').style.display = 'block'
    document.getElementById('cal').style.display = 'flex'
    document.getElementById('cal').style.justifyContent = 'space-between'
  }
  const hide = () => {
    document.getElementById('cal').style.display = 'none'

  }

  const publishButton = async () => {
    if (!productData.pname || !productData.pdesc || !productData.catagory || !productData.pprice || !productData.pdiscount || !productData.pimage) {
      alert('All Field is Required')
    } else {

      if (document.getElementById('spinner').style.display === 'none') {
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('spinner').style.float = 'left';
        document.getElementById('spinner').style.margin = '5px 5px 0px 0px';
        // document.getElementById('login_title').innerHTML = 'Uploading...';
      }

      // const { pname, pdesc, pprice, pdiscount, pimage } = productData;

      const formData = new FormData()
      formData.append('pimage', productData.pimage, productData.pimage.name)
      formData.append('pname', productData.pname)
      formData.append('pdesc', productData.pdesc)
      formData.append('catagory', productData.catagory)
      formData.append('pprice', productData.pprice)
      formData.append('pdiscount', productData.pdiscount)
      formData.append('inr_off', inr_off)
      formData.append('seles_price', seles_off)

      const res = await fetch(`${apiurl}/uploadproduct`,
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await res.json()
      // console.log(result)
      if (result === 'image_already_exist') {
        document.getElementById('spinner').style.display = 'none';

        alert('This Product Already Exist...')
      } else {
        alert('Successfully Upload...')
        window.location.reload();
      }
    }
  }




  return (
    <>
      {/* form modal  */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Upload New Product</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>


            <form className="up_form" method="post" enctype="multipart/form-data">

              <div className='field_margin'>
                <label className='field_title'>Product Name</label>
                <input className='form-control' onChange={inputData} name='pname' type='text' placeholder='Enter Product Name' />
              </div>
              <div className='field_margin'>
                <label className='field_title'>Description</label>
                <textarea class="form-control" onChange={inputData} name='pdesc' id="exampleFormControlTextarea1" rows="3" placeholder='Product Description...'></textarea>
              </div>
              <div className='field_margin'>
                <select class="form-select" onChange={inputData} name='catagory'>
                  <option value='' >Select Catagory</option>
                  <option value="cloths">Men & Women Cloths</option>
                  <option value="laptop">Laptop and Computer</option>
                  <option value="mobiles">Mobiles & Tablets</option>
                  <option value="watch">Watch</option>
                  <option value="headphones">Head phones</option>
                  <option value="sunglasses">Sunglasses</option>
                  <option value="camera">Camera</option>
                  <option value="speakers">Speakers</option>

                </select>
              </div>

              <div className='field_margin field_margin2'>
                <div>
                  <label className='field_title'>Price</label>
                  <input className='form-control fieldx' onChange={inputData} name='pprice' type='text' placeholder="₹" />
                </div>
                <div>
                  <label className='field_title'> Discount </label>
                  <input className='form-control fieldx1' onChange={inputData} name='pdiscount' placeholder="%" type='text' />
                </div>
              </div>
              <div id='cal'>
                <div>{seles} <u> ({inroff})</u> <b>{' ' + discount + '% Off'}</b></div>
                <div><NavLink onClick={hide} ><i class="fa-solid fa-eye-slash"></i></NavLink></div>
              </div>


              <div class="field_margin">
                <label className='field_title'>Product Image*</label>
                <input type="file" class="form-control" onChange={fileData} name='pimage' id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn-cancel" data-bs-dismiss="modal" aria-label="Close"> Cancel </button>
                <button type="button" class="btn-submit" onClick={publishButton}>
                  <span class="spinner-border spinner-border-sm" id='spinner' style={{ display: 'none' }} role="status" aria-hidden="true"></span>
                  <abbr id='login_title'> Upload </abbr>
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>




      {/* /////////////////////////////------ body -------///////////////////////////////// */}


      <div className='admin_panel'>
        {/* left column  */}
        <div className='left_col'>
          <div className='left_fixed'>
            <LeftColumn show='show-1' />
          </div>
        </div>

        {/* Right Column */}
        <div className='right_col'>
          <div className='right_fixed'>
            <section className='topnav'>
              <RightColumn_TopNav />
            </section>


            {/* div-2 */}

            <div className='dashboard-3'>
              <div className='admin_dashboard'>
                <NavLink data-bs-toggle="modal" data-bs-target="#exampleModal" className='option_x c1'>
                  <div>
                    <i className="div3icon fa-solid fa-file-arrow-up"></i>
                  </div>
                  <span className='option-x1'> Upload New Product </span>
                </NavLink>
                <NavLink to={`/updateproduct/${id}`} className='option_x c6'>
                  <div>
                    <i class="div3icon fa-solid fa-pen-to-square"></i>
                  </div>
                  <span className='option-x1'> Edit &   Update / delete </span>
                </NavLink>
                <NavLink className='option_x c2' to={`/register_user/${id}`}>
                  <div>
                    <i class="div3icon fa-solid fa-users"></i>
                  </div>
                  <span className='option-x1'> Register Users</span>
                </NavLink>
                <NavLink className='option_x c7' to={`/events/${id}`}>
                  <div>
                    <i class="div3icon fa-solid fa-calendar-days"></i>
                  </div>
                  <span className='option-x1'> Events </span>
                </NavLink>



              </div>

              {/* div-3 */}
              <div className='admin_dashboard'>
                <NavLink className='option_x c4' to={`/feedback/${id}`}>
                  <div>
                    <i class="div3icon fa-solid fa-comment"></i>
                  </div>
                  <span className='option-x1'> Feedback / Reports</span>
                </NavLink>
                <NavLink className='option_x c5' to={`/received_order/${id}`}>
                  <div>
                    <i class=" div3icon fa-solid fa-clock-rotate-left"></i>
                  </div>
                  <span className='option-x1'> Order History</span>
                </NavLink>

                <NavLink className='option_x c3' to={`/usersupport/${id}`}>
                  <div>
                    <i class="div3icon fa-solid fa-headphones"></i>
                  </div>
                  <span className='option-x1'> Users Support</span>
                </NavLink>
                <NavLink className='option_x c8' to={`/notifications/${id}`}>
                  <div>
                    <i class="div3icon fa-solid fa-bell"></i>
                  </div>
                  <span className='option-x1'> Notifications </span>
                </NavLink>
              </div>
            </div>

            <div>
              <Chart />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
