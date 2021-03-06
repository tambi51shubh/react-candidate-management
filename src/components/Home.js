import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddContact from './AddContact';
import { deleteContact, filterContactByGender, filterContactByQuery, clearFilters } from '../slices/contactSlice';

const Home = () => {
    const contacts = useSelector((state) => state.contacts);
    const filteredContacts = useSelector((state) => state.filteredContacts);
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState("");
    const [genderFilter, setGenderFilter] = useState({male: false, female: false});

    const deleteContactFunc = (id)=>{
        dispatch(deleteContact(id))
        toast.success("Contact Deleted Successfully!");
    }

    const handleSearchUpdate = (e) => {
        setGenderFilter({ male: false, female: false });
        setSearchQuery(e.target.value);
      }

    const handleGenderCheck = (e) => {
      const genderFilterNew = {...genderFilter};
      genderFilterNew[e.target.name] = e.target.checked;
      setGenderFilter(genderFilterNew);
      setSearchQuery("");
    }

    useEffect(() => {
        if (!genderFilter.male && !genderFilter.female && !searchQuery) {
            dispatch(clearFilters());
        }
    }, [dispatch, genderFilter.female, genderFilter.male, searchQuery])

    useEffect(() => {
        dispatch(filterContactByGender(genderFilter))
    }, [dispatch, genderFilter]);

    useEffect(() => {
        if (searchQuery) {
            dispatch(filterContactByQuery({ query: searchQuery, filtered: filteredContacts.length }))
        } 
    }, [dispatch, filteredContacts.length, searchQuery]);
    
    const contactsToShow = (genderFilter.male || genderFilter.female || searchQuery) ? filteredContacts : contacts;

    return (
        <div className='container'>
            <div className='column'>
                <div className="form-check form-check-inline mx-5">
                    <input name="male" className="form-check-input" type="checkbox" checked={genderFilter.male} value="" id="maleCheck" onChange={handleGenderCheck}/>
                    <label className="form-check-label" htmlFor="maleCheck">
                        Male
                    </label>
                </div>
                <div className="form-check form-check-inline ">
                    <input name="female" className="form-check-input" type="checkbox" value="" checked={genderFilter.female} id="femaleCheck" onChange={handleGenderCheck}/>
                    <label className="form-check-label" htmlFor="femaleCheck">
                        Female
                    </label>
                </div>
                <div className="form-check form-check-inline mx-5">
                    <div className="input-group m-5 lg">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Search ..." value={searchQuery} onChange={handleSearchUpdate}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <table className='table table-hover'>
                        <thead className='text-white bg-dark text-center'>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Gender</th>
                                <th scope='col'>Action</th>
                            </tr>                    
                        </thead> 
                        <tbody>
                            {
                                contactsToShow.map((contact) => (
                                    <tr key={contact.id}>
                                        <td className='ps-5'>{`${contact.first_name} ${contact.last_name}`}</td>
                                        <td className='ps-5'>{contact.email}</td>
                                        <td className='ps-5'>{contact.gender.toLowerCase()}</td>
                                        <td className='ps-5'>
                                            <button className='btn btn-danger btn-sm' onClick={() => deleteContactFunc(contact.id)}> Delete </button>
                                        </td>
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-12 my-5 text-end">
                    <AddContact />
                </div>
            </div>
        </div>
    );
}

export default Home;