import React from 'react';
import contacts from './../contacts.json';
import './ContactList.css';

const listOfContacts = contacts.slice(0, 5);

class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: listOfContacts,
    };
  }

  addContact = () => {
    const contact = contacts[Math.floor(Math.random() * (contacts.length - 1))];
    const list = [...this.state.contacts, contact];
    this.setState({
      contacts: list,
    });
  };

  sortPopularity = () => {
    const list = [...this.state.contacts];
    list.sort((first, second) => {
      return second.popularity - first.popularity;
    });
    this.setState({
      contacts: list,
    });
  };

  sortName = () => {
    const list = [...this.state.contacts];
    list.sort((first, second) => {
      return first.name < second.name ? -1 : 1;
    });
    this.setState({
      contacts: list,
    });
  };

  deleteContact(name) {
    const list = [...this.state.contacts];
    const contactIndex = list.findIndex((e) => e.name === name);
    list.splice(contactIndex, 1);
    this.setState({
      contacts: list,
    });
  }

  render() {
    return (
      <div className="contacts-list">
        <h1>Contacts List</h1>
        <button onClick={this.addContact}>Add Random Contact</button>
        <button onClick={this.sortName}>Sort by name</button>
        <button onClick={this.sortPopularity}>Sort popularity</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((contact) => {
              return (
                <tr key={contact.name}>
                  <td>
                    <img src={contact.pictureUrl} alt={contact.name} />
                  </td>
                  <td>
                    <p>{contact.name}</p>
                  </td>
                  <td>{Math.round(contact.popularity * 100) / 100}</td>
                  <td>
                    <button onClick={() => this.deleteContact(contact.name)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ContactList;
