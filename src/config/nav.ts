// main navigation
export const navigation = [

      { 
      text: 'Team',
      // isHome: true,
      link: '/team',
      description: "Meet the EarthNet team.",
    },
    { 
      text: 'Science',
      name: 'Science',
      description: "Third-party funded projects with EarthNet team involvement.",
      items: [
        { text: 'WeatherGenerator', link: '/projects/weathergenerator',
          description: "Horizon Europe project WeatherGenerator.",
         },
        { text: 'ELIAS', link: '/projects/elias',
          description: "Horizon Europe project ELIAS.",
         },
        { text: 'DeepExtremes', link: '/projects/deepextremes',
          description: "ESA AI4Science project DeepExtremes.",
         },
         { text: 'DeepCube', link: '/projects/deepcube',
          description: "Horizon 2020 project DeepCube.",
         },
      ]
    },
    {
        text: 'Resources',
        items: [
          // { text: 'GreenEarthNet', link: '/resources/datasets/greenearthnet',
          //   description: "Utilize our tools and datasets to support your work and research.",
          //  },
          // { text: 'EarthNet2021', link: '/resources/datasets/earthnet2021',
          //   description: "Explore our comprehensive guides on various topics related to the project.",
          // },
          { text: 'Publications', link: '/resources/publications',
            description: "Access our latest research papers, reports, and articles.",
          },
          { text: 'Opportunities', link: '/resources/opportunities',
            description: "Opportunities to work with us.",
          },
          { text: 'Datasets', link: '/resources/datasets',
            description: "Datasets and databases maintained by us.",
          },
          { text: 'Software', link: '/resources/software',
            description: "Github repositories and documentation for our software packages.",
          },
        ]
      },
    
    // { text: 'Events', link: '/events' },
    { text: 'News', link: '/blog' },
    // { text: 'Contact', link: '/contact' },
  ];
  
// footer links
 export const navFooter = [
    { text: 'Imprint', link: '/terms/imprint' },
    { text: 'Privacy Policy', link: '/terms/privacy' },
  ]