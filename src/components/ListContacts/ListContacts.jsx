import { useSelector } from 'react-redux';

import { ContactItem } from 'components';
import { selectedContacts } from '../../redux/contactsSlice/contactsSelectors.js';
import { selectedFilter } from '../../redux/filterSlice/filterSelectors.js';


export const ContactsList = () => {

  const contacts = useSelector(selectedContacts)
  const filter = useSelector(selectedFilter)

  const filteredContacts = ()=> {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  }
  const  getFilteredContacts =filteredContacts();
  return (
    <ul>
      {getFilteredContacts?.map(contact => (
        <ContactItem
          key={contact.id}
          {...contact}
        
        />
      ))}
    </ul>
  );
};
