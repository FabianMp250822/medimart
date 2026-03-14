import {
  LucideProps,
  Search,
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
  Bell,
  Menu,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  User,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  FileText,
  BarChart3,
  Stethoscope,
  HeartPulse,
  Tag,
  Briefcase,
  MessageSquare,
  PlusCircle,
  Trash2,
  Save,
  Heart,
  HeartOff,
  ArrowLeft,
  Phone,
  Download,
  MapPin,
  Send,
  Check,
  Edit,
} from "lucide-react";

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.153-1.908 4.153-1.233 1.233-3.14 2.553-6.412 2.553-5.174 0-9.284-4.186-9.284-9.36s4.11-9.36 9.284-9.36c2.814 0 4.514 1.11 5.926 2.441l2.303-2.303C18.247 1.347 15.655 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  ),
  dashboard: LayoutDashboard,
  users: Users,
  calendar: Calendar,
  settings: Settings,
  logout: LogOut,
  bell: Bell,
  menu: Menu,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  moreVertical: MoreVertical,
  user: User,
  mail: Mail,
  lock: Lock,
  spinner: Loader2,
  alert: AlertCircle,
  search: Search,
  fileText: FileText,
  chart: BarChart3,
  stethoscope: Stethoscope,
  health: HeartPulse,
  tag: Tag,
  briefcase: Briefcase,
  message: MessageSquare,
  plus: PlusCircle,
  trash: Trash2,
  save: Save,
  heart: Heart,
  heartOff: HeartOff,
  arrowLeft: ArrowLeft,
  phone: Phone,
  download: Download,
  location: MapPin,
  send: Send,
  check: Check,
  edit: Edit,
};
