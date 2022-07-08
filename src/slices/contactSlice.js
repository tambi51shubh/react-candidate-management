import { createSlice } from '@reduxjs/toolkit';

const initialData = [{
        id: 1,
        first_name: "Jeanette",
        last_name: "Penddreth",
        email: "jpenddreth0@census.gov",
        gender: "Female"
    },
    {
        id: 2,
        first_name: "Giavani",
        last_name: "Frediani",
        email: "gfrediani1@senate.gov",
        gender: "Male"
    },
    {
        id: 3,
        first_name: "Noell",
        last_name: "Bea",
        email: "nbea2@imageshack.us",
        gender: "Female"
    },
    {
        id: 4,
        first_name: "Willard",
        last_name: "Valek",
        email: "wvalek3@vk.com",
        gender: "Male"
    }
];

const initialState = {
    contacts: initialData,
    filteredContacts: [],
}

export const includedFirstLastName = (item, query) => 
    item.first_name.includes(query) || item.last_name.includes(query) || item.email.includes(query);

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
      addContact: (state, action) => {
 
        state.contacts.push(action.payload);
      },
      deleteContact: (state, action) => {
        state.contacts = state.contacts.filter(item => item.id !== action.payload);
      },
      filterContactByGender: (state, action) => {
        if (action.payload.both) {
            state.filteredContacts = state.contacts;
        } else {
            state.filteredContacts = state.contacts.filter(item => item.gender.toLowerCase() === action.payload.gender);
        }
      },
      filterContactByQuery: (state, action) => {
        state.filteredContacts = state.contacts.filter(item => includedFirstLastName(item, action.payload.query));
      },
      clearFilters: (state) => {
        state.filteredContacts = [];
      },
    },
  });

  export const { addContact, deleteContact, filterContactByGender, filterContactByQuery, clearFilters } = contactSlice.actions

  export default contactSlice.reducer;
