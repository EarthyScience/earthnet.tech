import React from 'react';
import { ContactsProps } from './FooterTypes';
import ProtectedEmail from './ProtectedEmail';
const Contacts = ({ 
  data, 
  title = '',
  subtitle = 'Office'
}: ContactsProps) => {
  const { contacts, mainEmail } = data;
  
  const hasContacts = Boolean(
    contacts?.length || mainEmail
  );

  if (!hasContacts) {
    return null;
  }

  return (
    //   {hasContacts && (
        <div className="space-y-4">
          <h3 className="text-lg text-[var(--foreground)]">
            {title}
          </h3>
          <div className="space-y-4">
            <h4 className="text-[var(--foreground)]">{subtitle}</h4>
            <ul className="space-y-4 text-sm text-[var(--secondary-link-color)]">
              {contacts?.map((contact, index) => (
                <li key={index} className="space-y-1">
                  {contact.name && (
                    <div className="font-medium">{contact.name}</div>
                  )}
                  {contact.position && (
                    <div>{contact.position}</div>
                  )}
                  {contact.email && (
                    <div>
                      <ProtectedEmail email={contact.email} />
                      </div>
                  )}
                </li>
              ))}
              {mainEmail && (
                <li>
                  <div>
                  <ProtectedEmail email={mainEmail} />
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
    )
}
export default Contacts;