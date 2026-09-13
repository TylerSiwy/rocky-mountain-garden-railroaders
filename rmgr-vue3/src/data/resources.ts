export type ResourceItem = {
  title: string
  description: string
  href: string
}

export type ResourceSection = {
  title: string
  description?: string
  items: ResourceItem[]
}

export const resourcesSections: ResourceSection[] = [
  {
    title: 'Model Railroad Clubs',
    description: 'Clubs and hobby groups worth exploring.',
    items: [
      {
        title: 'Calgary Model Railway Society (CMRS)',
        description: 'Information on upcoming events, model railway clubs in the Calgary area.',
        href: 'https://www.calgarymodelrailway.ca/',
      },
      {
        title: 'National Model Railroad Association',
        description: 'Standards, learning materials, and hobby resources.',
        href: 'https://www.nmra.org',
      },
    ],
  },
  {
    title: 'Local Attractions and Events',
    description: 'Nearby rail-themed destinations and places to visit.',
    items: [
      {
        title: 'Supertrain Calgary',
        description: 'The largest model train show in Canada, located in Calgary.',
        href: 'https://supertrain.ca',
      },
      {
        title: 'Iron Horse Park',
        description: 'Calgary-area miniature railway and family destination.',
        href: 'https://ironhorsepark.ca/',
      },
      {
        title: 'Aspen Crossing',
        description: 'Railway-themed destination with excursions and events.',
        href: 'https://www.aspencrossing.com/',
      },
    ],
  },
  {
    title: 'Modeling Tips',
    description: 'Articles and techniques for better layouts.',
    items: [
      {
        title: 'Garden Railways Magazine',
        description: 'Articles and inspiration focused on garden railroading.',
        href: 'https://www.trains.com/grw/',
      },
      {
        title: 'Model Railroader Magazine',
        description: 'Articles, how-tos, and layout inspiration.',
        href: 'https://www.trains.com/mrr/',
      },
    ],
  },
  {
    title: 'YouTube Channels',
    description: 'Video creators with useful modeling content.',
    items: [
      {
        title: 'Riks Railway',
        description:
          'A blog for a British model railway, Rik has been featured in numerous G-Scale magazines.',
        href: 'https://riksrailway.blogspot.com/',
      },
      {
        title: 'HSBA Garden Railway',
        description: 'Another British garden railway channel with great layout inspiration.',
        href: 'https://www.youtube.com/@hsbagardenrailway',
      },
      {
        title: 'Summit Railway',
        description: 'A German model railroader with regular content and updates.',
        href: 'https://www.youtube.com/@summitrailway',
      },
    ],
  },
  {
    title: 'Social Media Pages',
    description: 'Pages worth following for updates and inspiration.',
    items: [
      {
        title: 'Garden Railroads Reddit',
        description: 'Community discussions and shared layout photos.',
        href: 'https://old.reddit.com/r/GardenRailroads/',
      },
      {
        title: 'Brunel Models Instagram',
        description: 'Layouts, products, and model railroading inspiration.',
        href: 'https://www.instagram.com/brunelmodels/',
      },
      {
        title: 'Garden Railroaders Facebook Group',
        description: 'Club-style discussion and shared posts from garden railway fans.',
        href: 'https://www.facebook.com/groups/814561258654535/',
      },
    ],
  },
  {
    title: 'Stores',
    description: 'Retailers and suppliers for trains, scenery, and tools.',
    items: [
      {
        title: 'Trains and Such',
        description: 'Local hobby shop specializing in model railroading in all scales.',
        href: 'https://trainsandsuch.com/',
      },
      {
        title: 'Ultimate Trains',
        description: 'Online store for G-Scale trains and accessories. Located in Nanton, Alberta.',
        href: 'https://www.ultimatetrains.com/',
      },
      {
        title: 'LGB',
        description: 'Gold standard in quality for G-Scale products.',
        href: 'https://www.lgb.com/',
      },
    ],
  },
  {
    title: 'Painting Tips',
    description: 'Paint, weathering, and finishing techniques.',
    items: [
      {
        title: 'Märklin of Sweden',
        description: 'A railway Youtube channel focusing on painting and modelling.',
        href: 'https://www.youtube.com/@marklinofsweden',
      },
    ],
  },
]
