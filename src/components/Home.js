import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddContact from './AddContact';
import SearchContact from './SearchContact';
import { deleteContact, filterContactByGender, filterContactByQuery } from '../slices/contactSlice';

const Home = () => {
    const contacts = useSelector((state) => state.contacts);
    const filteredContacts = useSelector((state) => state.filteredContacts);
    const queriedContacts = useSelector((state) => state.queriedContacts);
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState("");
    const [genderFilter, setGenderFilter] = useState({male: false, female: false});

    const deleteContactFunc = (id)=>{
        dispatch(deleteContact(id))
        toast.success("Contact Deleted Successfully!");
    }

    const handleGenderCheck = (e) => {
      const genderFilterNew = {...genderFilter};
      genderFilterNew[e.target.name] = e.target.checked;
      setGenderFilter(genderFilterNew);
    }

    const handleSearchUpdate = (query) => setSearchQuery(query)

    useEffect(() => {
        if (genderFilter.male) {
            dispatch(filterContactByGender("male"));
        } else if (genderFilter.female) {
            dispatch(filterContactByGender("female"));
        }
    }, [dispatch, genderFilter.female, genderFilter.male]);

    useEffect(() => {
        if (searchQuery) {
            dispatch(filterContactByQuery({ query: searchQuery, filtered: filteredContacts.length }))
        } 
    }, [dispatch, filteredContacts.length, searchQuery]);

    // useEffect(() => {
    //     if ((genderFilter.male && genderFilter.female)
    //         || (!genderFilter.male && !genderFilter.female)) {
    //         setFilteredContacts([...contacts]);
    //     } else if (genderFilter.male) {
    //         const filter = filteredContacts.filter(contact => contact.gender.toLowerCase() === "male");
    //         setFilteredContacts([...filter]);
    //     } else if (genderFilter.female) {
    //         const filter = filteredContacts.filter(contact => contact.gender.toLowerCase() === "female");
    //         setFilteredContacts([...filter]);
    //     }
    //     if (searchQuery) {
    //         setFilteredContacts([...filteredContacts.filter(contact => {
    //             return contact.first_name.includes(searchQuery) || contact.last_name.includes(searchQuery);
    //         })]);
    //     }
    // }, [searchQuery, contacts, filteredContacts, genderFilter.male, genderFilter.female]);
    let contactsToShow = contacts;
    if (searchQuery) {
        contactsToShow = queriedContacts;
    } else if (genderFilter.male || genderFilter.female) {
        contactsToShow = filteredContacts;
    }

    console.log(">>", contactsToShow);

    return (
        <div className='container'>
            <div className='column'>
                <div className="form-check form-check-inline mx-5">
                    <input name="male" className="form-check-input" type="checkbox" value="" id="maleCheck" onChange={handleGenderCheck}/>
                    <label className="form-check-label" htmlFor="maleCheck">
                        Male
                    </label>
                </div>
                <div className="form-check form-check-inline ">
                    <input name="female" className="form-check-input" type="checkbox" value="" id="femaleCheck" onChange={handleGenderCheck}/>
                    <label className="form-check-label" htmlFor="femaleCheck">
                        Female
                    </label>
                </div>
                <div className="form-check form-check-inline mx-5">
                    <SearchContact onSearchUpdate={handleSearchUpdate}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <table className='table table-hover'>
                        <thead className='text-white bg-dark text-center'>
                            <tr>
                                <th scope='col'>#</th>
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
                                        <td className='ps-4'>{contact.id}</td>
                                        <td className='ps-5'>{`${contact.first_name} ${contact.last_name}`}</td>
                                        <td className='ps-5'>{contact.email}</td>
                                        <td className='ps-5'>{contact.gender}</td>
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