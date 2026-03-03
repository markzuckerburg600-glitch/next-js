import { 
  Code2, 
  Cpu, 
  FileCode, 
  Server, 
  Smartphone, 
  Link2, 
  Terminal, 
  Palette, 
  Shield, 
  Network, 
  BarChart3, 
  Cloud,
  LucideIcon 
} from 'lucide-react';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: 'conference' | 'hackathon' | 'meetup';
  image: LucideIcon;
  tags: string[];
  url?: string;
}

export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'React Summit 2024',
    description: 'The largest React conference in the world with talks from the core team and industry experts.',
    date: '2024-06-15',
    location: 'San Francisco, CA',
    type: 'conference',
    image: Code2,
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    url: 'https://reactsummit.com'
  },
  {
    id: '2',
    title: 'AI & Machine Learning Hackathon',
    description: '48-hour hackathon focused on building innovative AI solutions with cutting-edge technologies.',
    date: '2024-07-20',
    location: 'New York, NY',
    type: 'hackathon',
    image: Cpu,
    tags: ['AI', 'Machine Learning', 'Hackathon', 'Innovation'],
    url: 'https://aihackathon.dev'
  },
  {
    id: '3',
    title: 'TypeScript Meetup',
    description: 'Monthly gathering of TypeScript enthusiasts to share knowledge and best practices.',
    date: '2024-05-10',
    location: 'Austin, TX',
    type: 'meetup',
    image: FileCode,
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Web Development'],
    url: 'https://typescriptmeetup.com'
  },
  {
    id: '4',
    title: 'DevOps World 2024',
    description: 'Premier conference for DevOps professionals featuring workshops and keynotes on cloud native technologies.',
    date: '2024-08-05',
    location: 'Seattle, WA',
    type: 'conference',
    image: Server,
    tags: ['DevOps', 'Cloud', 'Kubernetes', 'Docker'],
    url: 'https://devopsworld.com'
  },
  {
    id: '5',
    title: 'Mobile App Development Hackathon',
    description: 'Create innovative mobile apps using React Native, Flutter, or native technologies.',
    date: '2024-06-28',
    location: 'Los Angeles, CA',
    type: 'hackathon',
    image: Smartphone,
    tags: ['Mobile', 'React Native', 'Flutter', 'iOS', 'Android'],
    url: 'https://mobilehack.dev'
  },
  {
    id: '6',
    title: 'Web3 & Blockchain Meetup',
    description: 'Explore the latest developments in blockchain technology, smart contracts, and decentralized applications.',
    date: '2024-05-25',
    location: 'Miami, FL',
    type: 'meetup',
    image: Link2,
    tags: ['Blockchain', 'Web3', 'Ethereum', 'Smart Contracts'],
    url: 'https://web3meetup.com'
  },
  {
    id: '7',
    title: 'Node.js Conf 2024',
    description: 'Annual conference celebrating Node.js with sessions on performance, security, and ecosystem updates.',
    date: '2024-09-12',
    location: 'Portland, OR',
    type: 'conference',
    image: Terminal,
    tags: ['Node.js', 'JavaScript', 'Backend', 'Serverless'],
    url: 'https://nodejsconf.com'
  },
  {
    id: '8',
    title: 'UX/UI Design Workshop',
    description: 'Hands-on workshop covering modern design principles, prototyping, and user experience best practices.',
    date: '2024-07-08',
    location: 'Chicago, IL',
    type: 'meetup',
    image: Palette,
    tags: ['Design', 'UX', 'UI', 'Figma', 'Prototyping'],
    url: 'https://uxworkshop.dev'
  },
  {
    id: '9',
    title: 'Cybersecurity Capture The Flag',
    description: 'Competitive cybersecurity event with challenges in web security, cryptography, and forensics.',
    date: '2024-08-18',
    location: 'Boston, MA',
    type: 'hackathon',
    image: Shield,
    tags: ['Cybersecurity', 'CTF', 'Security', 'Ethical Hacking'],
    url: 'https://cyberctf.com'
  },
  {
    id: '10',
    title: 'GraphQL Summit 2024',
    description: 'Deep dive into GraphQL ecosystem with talks from experts at Apollo, GitHub, and leading tech companies.',
    date: '2024-10-03',
    location: 'Denver, CO',
    type: 'conference',
    image: Network,
    tags: ['GraphQL', 'API', 'Backend', 'Apollo'],
    url: 'https://graphqlsummit.com'
  },
  {
    id: '11',
    title: 'Python Data Science Meetup',
    description: 'Monthly meetup for Python developers working with data science, machine learning, and analytics.',
    date: '2024-05-18',
    location: 'San Diego, CA',
    type: 'meetup',
    image: BarChart3,
    tags: ['Python', 'Data Science', 'Pandas', 'NumPy', 'Machine Learning'],
    url: 'https://pydatameetup.com'
  },
  {
    id: '12',
    title: 'Cloud Native Hackathon',
    description: 'Build cloud-native applications using Kubernetes, Docker, and modern cloud technologies.',
    date: '2024-09-20',
    location: 'Phoenix, AZ',
    type: 'hackathon',
    image: Cloud,
    tags: ['Cloud', 'Kubernetes', 'Docker', 'Microservices'],
    url: 'https://cloudhack.dev'
  }
];

export const eventTypes = ['conference', 'hackathon', 'meetup'] as const;
export const eventTags = [
  'React', 'JavaScript', 'Frontend', 'Web Development',
  'AI', 'Machine Learning', 'Hackathon', 'Innovation',
  'TypeScript', 'Programming', 'DevOps', 'Cloud',
  'Kubernetes', 'Docker', 'Mobile', 'React Native',
  'Flutter', 'iOS', 'Android', 'Blockchain', 'Web3',
  'Ethereum', 'Smart Contracts', 'Node.js', 'Backend',
  'Serverless', 'Design', 'UX', 'UI', 'Figma',
  'Prototyping', 'Cybersecurity', 'CTF', 'Security',
  'Ethical Hacking', 'GraphQL', 'API', 'Apollo',
  'Python', 'Data Science', 'Pandas', 'NumPy',
  'Microservices'
] as const;
