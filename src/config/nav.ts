// main navigation
export const navigation = [
    { 
      text: 'Project',
      isHome: true,
      name: 'Next Project Site',
      description: "Start your new project site with a clean and modern design.",
      items: [
        { text: 'About', link: '/project/about',
          description: "Learn more about the project, its goals, and its impact.",
         },
        { text: 'Team', link: '/project/team',
          description: "Meet the team behind the project, their roles, and contributions.",
         },
        { text: 'Partners', link: '/project/partners',
          description: "Discover our partners and collaborators who support the project.",
         },
        { text: 'Get Involved', link: '/project/get-involved',
          description: "Find out how you can contribute to the project and make a difference.",
         },
      ]
    },
    {
        text: 'Resources',
        items: [
          { text: 'Publications', link: '/resources/publications',
            description: "Access our latest research papers, reports, and articles.",
          },
          { text: 'Guides', link: '/resources/guides',
            description: "Explore our comprehensive guides on various topics related to the project.",
          },
          { text: 'Data & Tools', link: '/resources/tools-data',
            description: "Utilize our tools and datasets to support your work and research.",
           },
          { text: 'FAQs', link: '/resources/faqs',
            description: "Find answers to frequently asked questions about the project and its resources.",
          },
        ]
      },
    { text: 'Events', link: '/events' },
    { text: 'News', link: '/blog' },
    { text: 'Contact', link: '/contact' },
  ];
  
// footer links
 export const navFooter = [
    { text: 'Imprint', link: '/terms/imprint' },
    { text: 'Privacy Policy', link: '/terms/privacy' },
  ]