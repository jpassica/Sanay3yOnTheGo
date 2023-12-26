import React,  { useState, useEffect} from 'react'
import { Link,useMatch,useResolvedPath } from 'react-router-dom'
import '../styles/adminAccount.css'
import '../styles/editpage.css'
import axios from 'axios';


const EditProfile = ({adminId}) => {

    const [admin, setAdmin] = useState({});

    const onSubmit =async (e)  => {
        e.preventDefault()
    
        if (!name || !email || !phone || !address || !password) { 
            alert('All fields are required');
            return;
        }
        if (!email.includes('@')) {
                alert('Please enter a valid email');
                return;
            }
            if (password.length < 8) {
                alert('Password must be at least 8 characters');
                return;
            }
        if (phone.length !== 11) {
                alert('Please enter a valid phone number');
                return;
            }

        let integerValue = parseInt(name, 10);
        if (!isNaN(integerValue)) {
            alert("name can't be a number");
            return;
        }
        integerValue = parseInt(address, 10);
        if (!isNaN(integerValue)) {
            alert("address can't be a number");
            return;
        }
        integerValue = parseInt(phone, 11);
        if (isNaN(integerValue)) {
            alert("phone can't contain letters be a number");
            return;
        }

try {
    const response = await axios.post('http://localhost:5000/editProfile',{
    email: email,
    password: password,
    fullname: name,
    phone_number: phone,
    address: address,
    }, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
    console.log(response.data);
    alert('Changes saved successfully.')
    setName('')
    setPhone('')
    setEmail('')
    setAddress('')
    setPassword('')

} catch (error) {
    
    console.error('SignUp error:', error.response ? error.response.data : error.message);
        }
    }



    const fetchAdmin = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/client/${adminId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching admin:', error.message);
            throw error;
        }
    };
    
    
  useEffect(() => {
    let isMounted = true;

    const getAdmin = async () => {
    try {
        const getAdminFromServer = await fetchAdmin();
    if (isMounted) {
        setAdmin(getAdminFromServer);
    }
    } catch (error) {
        console.log(error);
    }
    };

    getAdmin();
    return () => {
      isMounted = false;
    };
  }, []);


    const [name,setName]=useState("")
    const [phone,setPhone]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [address,setAddress]=useState("")


    

  return (
    <div>

<div className='row justify-content-around mt-5 user-info'>

      <div class="col-12 col-md-5 details">
        <h3>Personal info</h3>
        
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label">FULL Name:</label>
            <div class="col-lg-8">
                              <input class="form-control" type="text" onChange={(e) => setName(e.target.value)} placeholder={admin.fullName} />
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-3 control-label">Phone Number:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" onChange={(e) => setPhone(e.target.value)} placeholder={admin.phone_number}/>
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input class="form-control" type="email" onChange={(e) => setEmail(e.target.value)} placeholder={admin.email}/>
            </div>
          </div>

          <div class="form-group">
            <label class="col-lg-3 control-label">Address:</label>
            <div class="col-lg-8">
              <div class="ui-select">
                <input id="user_time_zone" class="form-control" onChange={(e) => setAddress(e.target.value)} placeholder={admin.address}>
                </input>
              </div>
            </div>
          </div>
          <div className='rowbtn'>

            <div>
          <button onClick={onSubmit} id="edit_profile" class="btn btn-primary  my-4 probutton">Submit Changes</button>
          </div>

          <CustomLink to="/Account">
                    <a href="#" id="edit_profile" class="btn btn-primary  my-4 probutton">
                     Back to your account
                    
                </a>
                </CustomLink>
                </div>
        </form>

      </div>
      </div>
      
    </div>
  )
}

function CustomLink({to,children,...props})
{
    const topath=useResolvedPath(to)
    const isActive = useMatch({path: topath.pathname,end: true})
    return(
        <div className={isActive?"activate":""} >
            <Link to={to} {...props}>
                {children}
            </Link>

        </div>
    )

}

export default EditProfile
