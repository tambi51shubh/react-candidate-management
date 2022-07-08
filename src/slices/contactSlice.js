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

export const includedFirstLastName = (item, query) => {
  query = query.toLowerCase();
  return item.first_name.toLowerCase().includes(query) ||
    item.last_name.toLowerCase().includes(query) ||
    item.email.toLowerCase().includes(query);
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
      addContact: (state, action) => {
 
        state.contacts.push(action.payload);
      },
      deleteContact: (state, action) => {
        if (state.filteredContacts.length) {
          state.filteredContacts = state.filteredContacts.filter(item => item.id !== action.payload);
        }
        state.contacts = state.contacts.filter(item => item.id !== action.payload);
      },
      filterContactByGender: (state, action) => {
        debugger;
        const { male, female } = action.payload;
        if (male && female) {
          state.filteredContacts = state.contacts;
          return;
        } else if (male) {
          state.filteredContacts = state.contacts.filter(contact => contact.gender.toLowerCase() === "male");
          return;
        } else if (female) {
          state.filteredContacts = state.contacts.filter(contact => contact.gender.toLowerCase() === "female");
          return;
        }
        state.filteredContacts = state.contacts;
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
