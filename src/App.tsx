import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  Command,
  Download,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  X,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type Page = 'Overview' | 'Employees' | 'Analytics' | 'Settings'

type Employee = {
  name: string
  role: string
  team: string
  status: 'Active' | 'On leave' | 'Invited'
  location: string
  initials: string
}

const employees: Employee[] = [
  { name: 'Amelia Carter', role: 'Product Designer', team: 'Design', status: 'Active', location: 'London', initials: 'AC' },
  { name: 'Noah Williams', role: 'Frontend Engineer', team: 'Engineering', status: 'Active', location: 'Berlin', initials: 'NW' },
  { name: 'Sofia Laurent', role: 'People Partner', team: 'People', status: 'Active', location: 'Paris', initials: 'SL' },
  { name: 'Ethan Brooks', role: 'Data Analyst', team: 'Finance', status: 'On leave', location: 'Amsterdam', initials: 'EB' },
  { name: 'Maya Patel', role: 'Recruiter', team: 'People', status: 'Active', location: 'Dublin', initials: 'MP' },
  { name: 'Liam Novak', role: 'Backend Engineer', team: 'Engineering', status: 'Invited', location: 'Prague', initials: 'LN' },
]

const activity = [
  ['Maya Patel', 'completed onboarding', '8 min ago'],
  ['Noah Williams', 'updated emergency contact', '24 min ago'],
  ['Sofia Laurent', 'approved leave request', '1 hr ago'],
  ['Amelia Carter', 'uploaded a new document', '2 hrs ago'],
]

const chartData = [
  { month: 'Apr', headcount: 182, engagement: 76 },
  { month: 'May', headcount: 188, engagement: 78 },
  { month: 'Jun', headcount: 194, engagement: 79 },
  { month: 'Jul', headcount: 201, engagement: 81 },
  { month: 'Aug', headcount: 208, engagement: 84 },
  { month: 'Sep', headcount: 214, engagement: 86 },
]

function App() {
  const [page, setPage] = useState<Page>('Overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')
  const [notifications, setNotifications] = useState(false)

  const filteredEmployees = useMemo(
    () => employees.filter((employee) => `${employee.name} ${employee.role} ${employee.team}`.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  const go = (next: Page) => {
    setPage(next)
    setMobileOpen(false)
  }

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><Sparkles size={17} /></div>
          <div><strong>PeopleOps</strong><span>HR operations</span></div>
          <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18} /></button>
        </div>

        <nav className="nav-list" aria-label="Primary navigation">
          <p className="nav-label">Workspace</p>
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active={page === 'Overview'} onClick={() => go('Overview')} />
          <NavItem icon={<Users size={18} />} label="Employees" active={page === 'Employees'} onClick={() => go('Employees')} />
          <NavItem icon={<Activity size={18} />} label="Analytics" active={page === 'Analytics'} onClick={() => go('Analytics')} />
          <p className="nav-label">Manage</p>
          <NavItem icon={<Settings size={18} />} label="Settings" active={page === 'Settings'} onClick={() => go('Settings')} />
        </nav>

        <div className="sidebar-bottom">
          <div className="secure-note"><ShieldCheck size={16} /><span>Secure workspace<br /><small>Role-based access enabled</small></span></div>
          <div className="profile-mini"><div className="avatar avatar-purple">FC</div><div><strong>Finance & People</strong><span>Admin</span></div><ChevronDown size={15} /></div>
        </div>
      </aside>

      {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}

      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
            <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{page}</strong></div>
          </div>
          <div className="top-actions">
            <button className="search-pill" onClick={() => document.getElementById('global-search')?.focus()}><Search size={16} /><span>Search</span><kbd><Command size={11} /> K</kbd></button>
            <button className={`icon-button ${notifications ? 'is-active' : ''}`} onClick={() => setNotifications(!notifications)} aria-label="Notifications"><Bell size={18} /><i /></button>
            <div className="avatar avatar-blue">FC</div>
          </div>
        </header>

        <div className="content">
          {page === 'Overview' && <Overview onNavigate={go} onNotify={notify} />}
          {page === 'Employees' && <EmployeesView search={search} setSearch={setSearch} employees={filteredEmployees} onNotify={notify} />}
          {page === 'Analytics' && <AnalyticsView />}
          {page === 'Settings' && <SettingsView onNotify={notify} />}
        </div>
      </main>

      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </div>
  )
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>{icon}<span>{label}</span>{active && <span className="nav-dot" />}</button>
}

function Overview({ onNavigate, onNotify }: { onNavigate: (page: Page) => void; onNotify: (message: string) => void }) {
  return (
    <>
      <section className="page-heading">
        <div><div className="eyebrow">Monday, September 9</div><h1>Good morning, team.</h1><p>A clear view of your people, operations and momentum.</p></div>
        <button className="primary-button" onClick={() => onNavigate('Employees')}><Users size={16} /> View directory</button>
      </section>

      <section className="stat-grid">
        <StatCard title="Total employees" value="214" change="+6.4%" detail="vs. last month" icon={<Users size={18} />} />
        <StatCard title="Open positions" value="12" change="3 urgent" detail="need attention" icon={<BriefcaseBusiness size={18} />} warning />
        <StatCard title="Engagement" value="86%" change="+4.2%" detail="vs. last pulse" icon={<Activity size={18} />} />
        <StatCard title="Time off" value="18" change="this week" detail="requests pending" icon={<Clock3 size={18} />} />
      </section>

      <section className="dashboard-grid">
        <article className="panel chart-panel">
          <div className="panel-head"><div><span className="panel-kicker">People growth</span><h2>Headcount & engagement</h2></div><button className="ghost-button" onClick={() => onNotify('Report export prepared')}><Download size={15} /> Export</button></div>
          <div className="chart-legend"><span><i className="legend-dot blue" /> Headcount</span><span><i className="legend-dot violet" /> Engagement</span></div>
          <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}><defs><linearGradient id="headcountFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6d7cff" stopOpacity={0.28} /><stop offset="100%" stopColor="#6d7cff" stopOpacity={0} /></linearGradient><linearGradient id="engagementFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c084fc" stopOpacity={0.2} /><stop offset="100%" stopColor="#c084fc" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#e9edf5" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8790a5', fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#8790a5', fontSize: 12 }} /><Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e8ebf2', boxShadow: '0 12px 30px rgba(31,41,55,.08)' }} /><Area type="monotone" dataKey="headcount" stroke="#5868f2" strokeWidth={2.5} fill="url(#headcountFill)" /><Area type="monotone" dataKey="engagement" stroke="#b06cf6" strokeWidth={2} fill="url(#engagementFill)" /></AreaChart></ResponsiveContainer></div>
        </article>

        <article className="panel activity-panel">
          <div className="panel-head"><div><span className="panel-kicker">Live feed</span><h2>Recent activity</h2></div><button className="icon-button"><MoreHorizontal size={18} /></button></div>
          <div className="activity-list">{activity.map(([name, action, time]) => <div className="activity-item" key={name}><div className="avatar avatar-soft">{name.split(' ').map((n) => n[0]).join('')}</div><div><strong>{name}</strong><p>{action}</p></div><time>{time}</time></div>)}</div>
          <button className="text-button" onClick={() => onNotify('Activity history opened')}>View all activity <ArrowUpRight size={14} /></button>
        </article>
      </section>

      <section className="bottom-grid">
        <article className="panel onboarding-panel"><div className="panel-head"><div><span className="panel-kicker">People operations</span><h2>Onboarding progress</h2></div><span className="badge success">On track</span></div><div className="progress-row"><div className="progress-meta"><span>Current cohort</span><strong>8 / 10 completed</strong></div><div className="progress"><span style={{ width: '80%' }} /></div></div><div className="mini-stats"><div><strong>2</strong><span>Remaining</span></div><div><strong>92%</strong><span>Avg. completion</span></div><div><strong>4.8d</strong><span>Avg. time</span></div></div></article>
        <article className="panel action-panel"><span className="panel-kicker">Quick action</span><h2>Keep your workspace moving.</h2><p>Invite teammates, review requests or update your people records.</p><div className="quick-actions"><button onClick={() => onNotify('Invite flow opened')}><UserRound size={16} /> Invite employee</button><button onClick={() => onNotify('Requests queue opened')}><Clock3 size={16} /> Review requests</button></div></article>
      </section>
    </>
  )
}

function StatCard({ title, value, change, detail, icon, warning = false }: { title: string; value: string; change: string; detail: string; icon: React.ReactNode; warning?: boolean }) {
  return <article className="stat-card"><div className="stat-top"><span className="stat-icon">{icon}</span><span className={`change ${warning ? 'warning' : ''}`}>{change}</span></div><div className="stat-value">{value}</div><div className="stat-title">{title}</div><div className="stat-detail">{detail}</div></article>
}

function EmployeesView({ search, setSearch, employees, onNotify }: { search: string; setSearch: (value: string) => void; employees: Employee[]; onNotify: (message: string) => void }) {
  return <><section className="page-heading"><div><div className="eyebrow">People directory</div><h1>Employees</h1><p>Search, review and manage your people records.</p></div><button className="primary-button" onClick={() => onNotify('Invite flow opened')}><UserRound size={16} /> Invite employee</button></section><article className="panel table-panel"><div className="table-toolbar"><div className="table-search"><Search size={16} /><input id="global-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search people, roles or teams..." /></div><button className="ghost-button"><Download size={15} /> Export CSV</button></div><div className="table-scroll"><table><thead><tr><th>Employee</th><th>Team</th><th>Status</th><th>Location</th><th /></tr></thead><tbody>{employees.map((employee) => <tr key={employee.name}><td><div className="employee-cell"><div className="avatar avatar-soft">{employee.initials}</div><div><strong>{employee.name}</strong><span>{employee.role}</span></div></div></td><td>{employee.team}</td><td><span className={`status ${employee.status.toLowerCase().replace(' ', '-')}`}><i />{employee.status}</span></td><td>{employee.location}</td><td><button className="icon-button" onClick={() => onNotify(`${employee.name}'s record opened`)}><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div>{employees.length === 0 && <div className="empty-state">No employees match “{search}”.</div>}</article></>
}

function AnalyticsView() {
  return <><section className="page-heading"><div><div className="eyebrow">Insights</div><h1>Analytics</h1><p>Turn people data into decisions without leaving the workspace.</p></div></section><section className="analytics-grid"><article className="panel large-analytics"><div className="panel-head"><div><span className="panel-kicker">6 month trend</span><h2>Headcount</h2></div><span className="metric-chip">214 <small>+17.6%</small></span></div><div className="chart-wrap tall"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><CartesianGrid stroke="#e9edf5" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip /><Area type="monotone" dataKey="headcount" stroke="#5868f2" strokeWidth={3} fill="url(#headcountFill)" /></AreaChart></ResponsiveContainer></div></article><div className="insight-stack"><Insight title="Retention" value="94.2%" text="Stable over the last 90 days" /><Insight title="Engagement" value="86%" text="4.2 points above target" /><Insight title="Hiring velocity" value="18d" text="Median time to fill" /></div></section></>
}

function Insight({ title, value, text }: { title: string; value: string; text: string }) { return <article className="panel insight-card"><span>{title}</span><strong>{value}</strong><p>{text}</p><ArrowUpRight size={16} /></article> }

function SettingsView({ onNotify }: { onNotify: (message: string) => void }) {
  const [saved, setSaved] = useState(false)
  return <><section className="page-heading"><div><div className="eyebrow">Workspace controls</div><h1>Settings</h1><p>Configure workspace preferences and access controls.</p></div><button className="primary-button" onClick={() => { setSaved(true); onNotify('Settings saved') }}><Check size={16} /> Save changes</button></section><div className="settings-grid"><article className="panel settings-card"><div className="settings-heading"><ShieldCheck size={19} /><div><h2>Authentication</h2><p>Existing backend auth would connect here.</p></div></div><SettingRow title="Single sign-on" description="Allow members to authenticate through your identity provider." /><SettingRow title="Session timeout" description="Automatically sign out inactive sessions after 30 minutes." checked /><SettingRow title="Require MFA" description="Protect privileged accounts with a second factor." checked /></article><article className="panel settings-card"><div className="settings-heading"><Bell size={19} /><div><h2>Notifications</h2><p>Control what reaches your team.</p></div></div><SettingRow title="Leave requests" description="Notify admins when a request needs review." checked /><SettingRow title="New employee" description="Send an alert when onboarding starts." checked /><SettingRow title="Weekly digest" description="Receive a summary of people operations." /></article></div>{saved && <div className="save-note"><Check size={15} /> Changes are ready to sync with the API layer.</div>}</>
}

function SettingRow({ title, description, checked = false }: { title: string; description: string; checked?: boolean }) { const [on, setOn] = useState(checked); return <div className="setting-row"><div><strong>{title}</strong><p>{description}</p></div><button className={`toggle ${on ? 'on' : ''}`} onClick={() => setOn(!on)} aria-label={`${title} ${on ? 'enabled' : 'disabled'}`}><span /></button></div> }

export default App
