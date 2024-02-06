import { ContactsList, Form, Filter } from 'components';
import css from './App.module.css';

export const App = () => {
  return (
    <div className={css.phoneBookContainer}>
      <h1 className={css.phoneBookTitle}>Phone book</h1>
      <Form />
      <div className={css.contactsContainer}>
        <h2 className={css.contactsTitle}>Contacts</h2>
        <Filter/>
        <ContactsList
        />
      </div>
    </div>
  );
};
