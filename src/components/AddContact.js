import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addContact } from '../slices/contactSlice';

const AddContact = () => {
    const contacts = useSelector((state)=> state.contacts);
    const dispatch = useDispatch();
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('male');

    const resetData = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setGender('male');
    }

    const handleGenderChange = (e) => setGender(e.target.value)
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find( contact => contact.email === email) ;

        if(!email || !firstName || !lastName){
            return toast.warning("Please fill in all the fields!");
        }
        if(checkEmail) {
            return toast.error("This email already exists!");
        }
        
        const data = {
            id: contacts.length + 1,
            first_name: firstName,
            last_name: lastName,
            email,
            gender,
        };
        
        dispatch(addContact(data));
        toast.success("Employee Added Successfully!");
        resetData();
    }
    
    
    return (
        <div className='container'>
            <h1 className='display-3 my-5 text-center'>Add Employee Contact</h1>
            <div className="row">
                <div className="col-md-6 shadow mx-auto p-5">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group p-3">
                            <input type="text" placeholder='First Name' className='form-control' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-group p-3">
                            <input type="text" placeholder='Last Name' className='form-control' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="form-group p-3">
                            <input type="email" placeholder='E-mail' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group p-3">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="male" id="inlineRadio1" value="male" checked={gender === "male"} onChange={handleGenderChange}/>
                                <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="female" id="inlineRadio2" value="female" checked={gender === "female"} onChange={handleGenderChange}/>
                                <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                            </div>
                        </div>
                        <div className="form-group p-3">
                            <input type="submit" value='Add Employee' className='btn btn-dark me-5' />
                        </div>                   
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddContact;