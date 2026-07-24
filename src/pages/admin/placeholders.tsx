import { FileBarChart, HandCoins, Hammer, Settings, Sparkles, User, Users } from 'lucide-react';
import { ModulePlaceholder } from './ModulePlaceholder';

export function AdminServices() {
  return (
    <ModulePlaceholder
      icon={Sparkles}
      title={{ ta: 'சேவைகள்', en: 'Services' }}
      description={{ ta: 'பூஜை, அர்ச்சனை, தரிசன சேவைகளை நிர்வகிக்கவும்.', en: 'Manage poojas, archanas and darshan services.' }}
      features={[
        { ta: 'விலை நிர்ணயம்', en: 'Pricing' },
        { ta: 'நேர இடைவெளிகள்', en: 'Time slots' },
        { ta: 'கொள்ளளவு', en: 'Capacity' },
      ]}
    />
  );
}

export function AdminDonations() {
  return (
    <ModulePlaceholder
      icon={HandCoins}
      title={{ ta: 'நன்கொடைகள்', en: 'Donations' }}
      description={{ ta: 'நன்கொடைகள் மற்றும் ரசீதுகளைக் கண்காணிக்கவும்.', en: 'Track donations and issue receipts.' }}
      features={[
        { ta: 'ரசீதுகள்', en: 'Receipts' },
        { ta: '80G', en: '80G' },
        { ta: 'நோக்கங்கள்', en: 'Purposes' },
      ]}
    />
  );
}

export function AdminRenovation() {
  return (
    <ModulePlaceholder
      icon={Hammer}
      title={{ ta: 'திருப்பணி', en: 'Renovation' }}
      description={{ ta: 'திட்டங்கள், மைல்கற்கள் மற்றும் பட்ஜெட்டை நிர்வகிக்கவும்.', en: 'Manage projects, milestones and budgets.' }}
      features={[
        { ta: 'திட்டங்கள்', en: 'Projects' },
        { ta: 'மைல்கற்கள்', en: 'Milestones' },
        { ta: 'வெளிப்படைத்தன்மை', en: 'Transparency' },
      ]}
    />
  );
}

export function AdminSponsors() {
  return (
    <ModulePlaceholder
      icon={Users}
      title={{ ta: 'ஸ்பான்சர்கள்', en: 'Sponsors' }}
      description={{ ta: 'ஸ்பான்சர்கள் மற்றும் பங்களிப்புகளை நிர்வகிக்கவும்.', en: 'Manage sponsors and their contributions.' }}
      features={[
        { ta: 'அடுக்குகள்', en: 'Tiers' },
        { ta: 'அங்கீகாரம்', en: 'Recognition' },
      ]}
    />
  );
}

export function AdminUsers() {
  return (
    <ModulePlaceholder
      icon={User}
      title={{ ta: 'பயனர்கள் & பங்குகள்', en: 'Users & Roles' }}
      description={{ ta: 'பயனர்கள் மற்றும் அணுகல் பங்குகளை நிர்வகிக்கவும்.', en: 'Manage users and access roles.' }}
      features={[
        { ta: 'பங்குகள்', en: 'Roles' },
        { ta: 'அனுமதிகள்', en: 'Permissions' },
      ]}
    />
  );
}

export function AdminReports() {
  return (
    <ModulePlaceholder
      icon={FileBarChart}
      title={{ ta: 'அறிக்கைகள்', en: 'Reports' }}
      description={{ ta: 'நிதி மற்றும் செயல்பாட்டு அறிக்கைகளை உருவாக்கவும்.', en: 'Generate financial and operational reports.' }}
      features={[
        { ta: 'ஏற்றுமதி', en: 'Export' },
        { ta: 'திட்டமிடல்', en: 'Scheduling' },
      ]}
    />
  );
}

export function AdminSettings() {
  return (
    <ModulePlaceholder
      icon={Settings}
      title={{ ta: 'அமைப்புகள்', en: 'Settings' }}
      description={{ ta: 'தளம் மற்றும் கோயில் அமைப்புகளை உள்ளமைக்கவும்.', en: 'Configure platform and temple settings.' }}
      features={[
        { ta: 'பொது', en: 'General' },
        { ta: 'அறிவிப்புகள்', en: 'Notifications' },
        { ta: 'பணம் செலுத்துதல்', en: 'Payments' },
      ]}
    />
  );
}
