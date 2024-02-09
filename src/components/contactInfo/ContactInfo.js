import React from 'react';
import useContactInfo from '@/hooks/swr/useContactInfo';

const ContactInfo = ({ socCode }) => {
  const {contactInfo: contactInfo, isLoading: isLoadingContactInfo} = useContactInfo();

  return (
    <div>
      <h1>contact Info</h1>
      {isLoadingContactInfo && <div>Loading contact info...</div>}
      {!isLoadingContactInfo && 
        contactInfo.map((contact) => {
          return <div key={contact.id}>primary { contact.primary} | {contact.city} {contact.stateProvince} {contact.postalCode}</div>;
        })
      } 
    </div>    
  );
};

export default ContactInfo;
