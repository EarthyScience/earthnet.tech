import { AddressData, ContactData } from '@/components/FooterTypes';

export const contactInfo = {
  copyright: "Lazaro Alonso",
  contact: {
    address: {
      company: "Max-Planck Institute for Biogeochemistry",
      street: "Hans-Knöll Str. 10",
      zip: "07745",
      city: "Jena",
      state: "Thuringia",
      country: "Germany"
    } as AddressData,

    data: {
      contacts: [
        {
          name: "Lazaro Alonso",
          position: "Researcher",
          email: "lalonso@bgc-jena.mpg.de"
        },
        // {
        //   name: "Alice",
        //   email: "alice.doe@mpg.de"
        // },
      ],
      // mainEmail: "contact@mpg.de"
    } as ContactData
  }
}